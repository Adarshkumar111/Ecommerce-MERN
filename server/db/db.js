import mongoose from "mongoose";

const connectDB=()=>{
mongoose
  .connect(
    "mongodb+srv://adarshbishwas02:adarsh2003@lms.rgjyws4.mongodb.net/ECOMMERCE",
  )
  .then(() => console.log("mongodb connected"))
  .catch((err)=> console.log(err));

}
export default connectDB;