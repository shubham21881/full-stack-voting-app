import express from 'express'
import user from '../Model/User.js'

const router=express.Router();


router.post('/signup',async (req,res)=>{
     res.send("this is signup page")
})



router.get('/login',async(req,res)=>{
   res.send('this is login page')
})





export default router;
