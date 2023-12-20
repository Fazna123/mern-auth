import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/auth_route.js';
import adminRoutes from './routes/adminRoute.js'
import cookieParser from 'cookie-parser';
import path from 'path'
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})
 
const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use(express.json());

app.use(cookieParser());

app.listen(3000, ()=>{
    console.log('Server Listening on http://localhost:3000')
})


app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)


app.use((err,req,res, next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message ||'Internal server error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    }) 
})

