import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser'
import db from './db.js'
import CandidateRouter from './routes/CandidateRoutes.js'
import UserRouter from './routes/UserRoutes.js'


const app = express();

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/user', UserRouter);
app.use('/candidate', CandidateRouter)

app.listen(3000, () => {
    console.log('listening on port 3000');
})