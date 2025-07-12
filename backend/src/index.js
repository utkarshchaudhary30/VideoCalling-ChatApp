import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";
import userRoutes from "./route/user.route.js";
import chatRoutes from "./route/chat.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}));
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);


// Catch-all 404 route
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port number: ${PORT}`);
  connectDB();
});