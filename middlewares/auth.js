import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken"
export const verifyToken=async(req,res,next)=>{
    const token=req.cookies['token'];
    if(!token)return next(new ErrorHandler(401,"Please login to access this route"));

    try{
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData._id;
        next();
    }catch(err){
        return next(new ErrorHandler(401, "Invalid token, please login again"));
    }
}

export const verifyRole=(roles=[])=>async(req,res,next)=>{
    const user=await User.findById(req.user);
    console.log(roles,user);
  if(roles.includes(user.role))return next();
  next(new ErrorHandler(403,"You are not authorized to access this route"));
}