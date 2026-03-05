import mongoose from "mongoose";
const url="mongodb+srv://adarshbishwas02:adarsh2003@lms.rgjyws4.mongodb.net/ecommerce"

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(url)
        console.log(`Mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Mongodb Error: ${error}`)
    }
}
export default connectDB;