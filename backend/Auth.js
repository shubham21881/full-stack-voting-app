import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// this is only middleware only checking

const jwtAuthMiddleware=(req,res,next)=>{
    // first check request headers has authorization or not


    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:"token is not found"})

       // Extract the jwt token from the request headers
       
       const token =req.headers.authorization.split(' ')[1];
       if(!token) return res.status(401).json({error:'Unauthorized'})


     try {
        // Verify the JWT token

          const decoded=jwt.verify(token,process.env.JWT_SECRET)

            req.person=decoded;
            console.log("auth k middleware start hua hai");
            
            next()


        
     } catch (error) {
         console.error(error);
        res.status(401).json({ error: 'Invalid token' });
     }
  


}



// Function to generate JWT token




const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'24h'})
}




export {jwtAuthMiddleware,generateToken}