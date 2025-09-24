import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
// const url='mongodb://127.0.0.1:27017/fullstackvoting';
const url=process.env.MONGODB_URL;
mongoose.connect(url).then(()=>{
    console.log('db connection is successful');
    
})


const db=mongoose.connection

export default db


//  username==> krishanmouryash_db_user
// password===> tYEMcVt9wiVxkMXR