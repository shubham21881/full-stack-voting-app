import dotenv from "dotenv";
dotenv.config(); 
import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser'
import db from './db.js'
import CandidateRouter from './routes/CandidateRoutes.js'
import UserRouter from './routes/UserRoutes.js'


const app = express();

const PORT=process.env.PORT || 5000
// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

app.use(bodyParser.json());

app.use(cors({
    origin: ['https://full-stack-voting-app.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/user', UserRouter);
app.use('/candidate', CandidateRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})