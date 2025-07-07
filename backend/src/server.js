import express from "express";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";
import userRoutes from "./route/user.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port number: ${PORT}`);
  connectDB();
});
