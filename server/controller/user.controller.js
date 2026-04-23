// user login

import { OTP } from "../model/Otp.js";
import { User } from "../model/User.js";
import sendOtp from "../utils/sendOtp.js";
import TryCatch from "../utils/TryCatch.js";
import jwt from "jsonwebtoken";

export const loginUser= TryCatch(async(req,res)=>{
    const {email}=req.body;

    // generate otp and save to db
    const subject = "Ecommerce App"

    const otp=Math.floor(Math.random()* 1000000);
    const prevOtp=await OTP.findOne({
        email,
    })

    if(prevOtp){
        await prevOtp.deleteOne();
    }
    await sendOtp({email, subject, otp});
    await OTP.create({email, otp});

    res.json({
        message:"OTP sent to your email"
    });
})

// verify otp

export const verifyUser=TryCatch(async(req,res)=>{
    const {email, otp}=req.body;

    const haveOtp=await OTP.findOne({
        email,
        otp
    })

    if(!haveOtp){
        return res.status(400).json({
            message:"Invalid OTP"
        })
    }

    let user = await  User.findOne({email});

    if(user){
        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

        await haveOtp.deleteOne();

        return res.json({
            message:"User Login successful",
            token,
            user
        })
    }
    else{
        user = await User.create({email});
        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

        await haveOtp.deleteOne();

        return res.json({
            message:"User Login successful",
            token,
            user
        })
    }
})