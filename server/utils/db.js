import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"ecommerce2026",
            
        })
         console.log(`MongoDB Connected successful`);
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;