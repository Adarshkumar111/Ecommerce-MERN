import express from "express";

import connectDB from "./db/db.js";

const app=express();

app.get("/",(req, res)=>{
    res.send({message:"Welcome to zosh bazar backend system"})
})
const port=5000;

app.listen(port,async()=>{
    console.log(`Server is running on port ${port}`);
    await connectDB();
})

