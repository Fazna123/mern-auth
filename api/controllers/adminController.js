
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import express from 'express'
import User from '../models/userModel.js'




export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("aaa",req.body)
    try {
      const validUser = await User.findOne({ email });
       if(validUser.isAdmin === false) return next(errorHandler(401,"wrong credential"))
      if (!validUser) return next(errorHandler(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const getAdminData = async (req, res, next) => {
    try {
      const adminDetails = req.admin;
      res.status(200).json({
        username: adminDetails.username,
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };



  export const getUsersData = async(req,res,next)=>{
    try {
     
      const usersDetails=await User.find({isAdmin:false},{password:0})
     
      res.send({usersDetails})
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };



  export const updateUser = async(req,res,next)=>{
    try {
      const {username,email}=req.body
      const user = await User.findOne({email})
     if(user){
      const isUpdated=await User.updateOne({email},{$set:{username}})
      console.log(req.body,isUpdated)
     
      const updatedUsers=await User.find({isAdmin:false},{password:0})
      res.send({updatedUsers})
     }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };




  export const addUser = async(req,res,next)=>{
    try {
      const {username,email}=req.body
      
      
        let password = "123456"
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser=new User({ username:username, email:email, password: hashedPassword })
        console.log(newUser)
       await newUser.save()
      
      const allUsers=await User.find({isAdmin:false},{password:0})
      res.send({allUsers})
      
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };



  export const  deleteUser = async(req,res,next)=>{
    try {
      console.log("deleted")
      const email=req.params.email
      
       const isDeleted=await User.findOneAndDelete({email:email})
      console.log(email)
      const updatedUsers=await User.find({isAdmin:false},{password:0})
      res.send({updatedUsers})
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }




  

  export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  };
