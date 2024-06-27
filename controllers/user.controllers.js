import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import  { compareSync, hashSync } from "bcrypt"

export const registerUser=TryCatch(async(req,res,next)=>{
  const{firstName,lastName,gender,dob,mobileNo,email,password,role}=req.body;
  
  const newPassword=hashSync(password,10);
  const newUser=await User.create({
    firstName,lastName,gender,dob,mobileNo,email,password:newPassword,role
  })
  sendToken(res,newUser,201,"User created");
});

export const loginUser=TryCatch(async(req,res,next)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email}).select("+password");

    if(!user)return next(new ErrorHandler(400,"Invalid Email or Password"));

    const isMatch=compareSync(password,user.password);
    if(!isMatch)return next(new ErrorHandler(400,"Invalid Email or Password"))
    sendToken(res,user,200,`Welcome Back ${user.firstName+" "+user.lastName}`);
})