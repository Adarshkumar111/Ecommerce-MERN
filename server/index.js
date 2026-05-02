import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cloudinary from "cloudinary";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
  
})

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// routes
app.use("/api/", userRoutes);
app.use("/api/products", productRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
