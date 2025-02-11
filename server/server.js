const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const fileURLToPath = require("url");
const userRoutes = require("./Routes/auth");
const quizRoutes = require("./Routes/quiz");
const adminRoutes = require("./Routes/admin");

const app = express();
const PORT = process.env.PORT || 3500;

const corsOptions = {
  // origin: "http://localhost:5173", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_ATLAS_URL);
const db = mongoose.connection;
db.on("error", (error) => console("Error in database connection"));
db.on("open", () => console.log("Database is Connected..."));

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Server is running on port 3500</h1>");
});

app.use("/api/auth", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
// http://localhost:3500/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
