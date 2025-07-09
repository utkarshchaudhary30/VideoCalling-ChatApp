// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ must match the name set in res.cookie()

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // ensure this env is defined

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
