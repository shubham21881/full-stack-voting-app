import express from 'express'
import Candidate from '../Model/Candidate.js'
import user from '../Model/User.js'
import {jwtAuthMiddleware,generateToken} from '../Auth.js'
const router=express.Router();



 async function  checkadminrole(userid){
     try {
        
   const User= await user.findById(userid)
   if (User.role==='admin'){
     return true
   }

     } catch (error) {
        return false
     }
}



router.post('/',jwtAuthMiddleware,async(req,res)=>{
    try{
    if(!await checkadminrole(req.person.id)){
        return res.status(403).json({message: 'user does not have admin role'});
    }
    const data=req.body;
    const newCandidate= new Candidate(data)
    const SavedCandidate= await newCandidate.save();
     res.status(200).json({error:"candidate succussefull saved",saveddata: SavedCandidate})
}catch(err){
    console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
}
})


 router.put('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    try{
         if(!checkadminrole(req.user.id))
            return res.status(403).json({message: 'user does not have admin role'});
      const  data= req.params.candidateID;
      const updateddata= req.body;
      const response= await Candidate.findByIdAndUpdate(data,updateddata,{
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation)
      })
    if (!response) {
    return res.status(404).json({ error: 'Candidate not found' });
}
       console.log('candidate data updated');
       res.status(200).json(response);


    }catch(err){
             console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

 })

// delete routes   for candidate
 
router.delete('/:candidateID',jwtAuthMiddleware, async (req,res)=>{
    try{ 
        if(!checkadminrole(req.user.id))
            return res.status(403).json({message: 'user does not have admin role'});
    const data=req.params.candidateID
    const response = await Candidate.findByIdAndDelete(data)
    if (!response) {
        return res.status(404).json({ error: 'Candidate not found' });
    }

    console.log('candidate deleted');
    res.status(200).json(response,{response:"candidate deleted"});
} catch(err){

}
    

})


//  let start voting

router.get('/vote/:candidateid/:userid',jwtAuthMiddleware,async(req,res)=>{
 const CandidateID= req.params.candidateid
 const userID=req.params.userid;
 console.log(CandidateID,userID);

 try{
 

    const candidate=  await Candidate.findById(CandidateID)
    if(!candidate){
          return res.status(404).json({ message: 'Candidate not found' });
      };

     const User=await user.findById(userID)

     if(!User){
            return res.status(404).json({ message: 'user not found' });
        };

    if(User.role=='admin'){
         return res.status(403).json({ message: 'admin is not allowed'});
    }
    if(User.isvoted){
            return res.status(400).json({ message: 'You have already voted' });
        }


    candidate.voter.push({user:userID})
    candidate.voteCount++

    await candidate.save();

    //update the user document
    User.isvoted=true;
    await User.save();
    return res.status(200).json({ message: 'Vote recorded successfully' });
 }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
 }


})



//  vote count
router.get('/vote/count',async(req,res)=>{
    const candidate = await Candidate.find().sort({voteCount: 'desc'});
    const voteRecord = candidate.map((data)=>{
        return [
            {"party": data.party, "count": data.voteCount}
        ]
    });

    return res.status(200).json(voteRecord);
})


router.get('/',async(req,res)=>{
    const candidates= await Candidate.find({},'name party _id')
    res.status(200).json(candidates);

})




export default router