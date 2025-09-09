import express from 'express'
import bodyParser from 'body-parser'
import db from './db.js'
import CandidateRouter from './routes/CandidateRoutes.js'
import UserRouter from './routes/UserRoutes.js'
const  app= express();
app.use(bodyParser.json());


app.use('/user', UserRouter);
app.use('/Candidate', CandidateRouter)



app.listen(3000,()=>{
    console.log('listening on port 3000');
    
})