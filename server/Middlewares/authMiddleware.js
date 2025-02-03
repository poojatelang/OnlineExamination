const jwt = require("jsonwebtoken");
const Student = require("../models/Student"); // Assuming you have a User model
require('dotenv').config()

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
console.log(token)
  if (!token) {
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.student = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


exports.protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    req.student = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.student.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};




