import { User } from "../models/user.js";

import bcrypt from "bcrypt"

import Jwt from "jsonwebtoken";
import { setcookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";



export const login=async(req,res,next)=>{
try {
    const {email,password}=req.body
let user =await User.findOne({email}).select("+password"); // select + password -> isliye krna pda kyuki hmlog schema password ko {select false} kiye haii


if(!user){
    return next(new ErrorHandler("Invalid Email or Password",404));
}

const ismatch= await bcrypt.compare(password,user.password);


if(!ismatch){
    return next(new ErrorHandler("Invalid Email or Password",404));
}

   setcookie(user,res,` Welcome Back ,${user.name} `,200)
} 
catch (error) {
    next(error)
}

}

export const register=async(req,res,next)=>{
try {
    const {name,email,password}=req.body;
    let user =await User.findOne({email});
    
    
    if(user){
        return next(new ErrorHandler("User Already Exist",404));
    }
    
    
    const hassedpassword= await bcrypt.hash(password,10);
    user=await User.create({
        name,email, password:hassedpassword
      } ) 
    setcookie(user,res,"Registered Successfully",201) 
} 
catch (error) {
    next(error)
}
    
 }


export const getmyprofile=(req,res)=>{    //// here we not use async function so we not use try,catch block
res.status(200).json({
    success:true,
    user:req.user
})
}

export const logout=(req,res)=>{
    res.status(200)
    .cookie("token","",
    {
        expires:new Date (Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
        secure:process.env.NODE_ENV==="Development" ? false:true 
    })
    .json({
        success:true,
        user:req.user
    })
    }







