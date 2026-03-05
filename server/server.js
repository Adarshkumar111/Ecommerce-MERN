

import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/db.js";

// create a database connection 
connectDB();

const app=express();
const PORT=process.env.PORT || 5000;

