import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser'
import db from './db.js'
import CandidateRouter from './routes/CandidateRoutes.js'
import UserRouter from './routes/UserRoutes.js'
const  app= express();
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/user', UserRouter);
app.use('/candidate', CandidateRouter)



app.listen(3000,()=>{
    console.log('listening on port 3000');
    
})