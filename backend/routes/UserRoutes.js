import express from 'express'
import user from '../Model/User.js'
import {jwtAuthMiddleware,generateToken} from '../Auth.js'

const router=express.Router();


router.post('/signup',async (req,res)=>{
    
    const data= req.body
    // console.log(data);
    
     try {
        
      const adminuser= await user.findOne({role:'admin'})
   if(data.role=="admin" && adminuser) {
    return res.status(400).json({error:"admin user already exists "})
   }
     if(!/^\d{12}$/.test(data.aadharCardNumber)){
        return res.status(400).json({error:"aadhar card must be 12 digit"})

    }

    const existinguser=await user.findOne({aadharCardNumber:data.aadharCardNumber})

   if(existinguser) {
    return res.status(400).json({error:'User with the same Aadhar Card Number already exists'})
   }


   // Create a new User document using the Mongoose model
   const newuser= new user(data);
   const response= await newuser.save();
   console.log(response);
   
    const  payload={
     userId:response.id,
     username:response.name
     }
    
     console.log(JSON.stringify(payload));
       const token = generateToken(payload)
         
       console.log(token);
        res.status(200).json({user:response, token:token})

     } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
     }
 


})



router.post('/login',async(req,res)=>{
   // Extract aadharCardNumber and password from request body
   const {aadharCardNumber,password}=req.body
        // Check if aadharCardNumber or password is missing
        if(!aadharCardNumber||!password){
            return res.status(400).json({error:"Aadhar Card Number and password are required"})
        }
        // Find the user by aadharCardNumber
      const User= await user.findOne({aadharCardNumber:aadharCardNumber});
        // If user does not exist or password does not match, return error
   if(!User||!(await User.comparePassword(password))){
     return res.status(401).json({error:"invalid  aadhar card number or password"})
   }
    // generate Token 
    const payload = {
        id: User.id,
    }
    const token = generateToken(payload);
    // return token  as response 
    res.json({token,
         user: {
      id: User.id,
      name: User.name,
      aadharCardNumber: User.aadharCardNumber,
      role: User.role
    }

    })
})



router.get('/profile' ,jwtAuthMiddleware,async(req,res)=>{
  const profiledata= req.person
  console.log(profiledata);
  const userid= profiledata.id
  
  const person= await user.findById(userid)
  console.log(person);
  
    res.status(200).json({person})
})




router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
   try {
     const userid= req.person.id;
     const { currentPassword, newPassword } = req.body; 
 if (!currentPassword || !newPassword) {
          return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
      }

      const person= await user.findById(userid)

if (!person || !(await user.comparePassword(currentPassword))) {
          return res.status(401).json({ error: 'Invalid current password' });
      }
// Update the user's password
      person.password = newPassword;
      await person.save();

      console.log('password updated');
      res.status(200).json({ message: 'Password updated' });

   } catch (error) {
    console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }

})


export default router;
