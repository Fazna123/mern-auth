import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/auth_route.js'
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})

const app = express();

app.use(express.json());


app.listen(3000, ()=>{
    console.log('Server Listening on http://localhost:3000')
})


app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

