import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String,
    },
    address:{
        type:String
    },
     password: {
        type: String,
        required: true
    },
    aadharCardNumber:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isvoted:{
        type:Boolean,
        default:false
    }


},{timestamps:true})



UserSchema.pre('save', async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
        next();  
    } catch (error) {
         return next(error);
    }
})


UserSchema.methods.comparePassword= async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}




const user= mongoose.model('user',UserSchema);
 export default user