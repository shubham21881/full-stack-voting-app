import mongoose from 'mongoose';

const url='mongodb://127.0.0.1:27017/fullstackvoting';
mongoose.connect(url).then(()=>{
    console.log('db connection is successful');
    
})


const db=mongoose.connection

export default db
