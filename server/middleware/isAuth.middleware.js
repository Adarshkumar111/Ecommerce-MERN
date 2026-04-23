import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const isAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers;

        if(!token){
            return res.status(401).json({
                message:"please login"
            })
        }

        const decodedData=jwt.verify(token, process.env.JWT_SECRET);

        req.user= await User.findById(decodedData._id);
        next();
    } catch (error) {
        res.status(500).json({
            message:"please login"
        })
    }
}