

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const multer = require("multer");
const path = require("path");
require('dotenv').config();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // filename format
  },
});

const upload = multer({ storage });


// export const register = [
// exports.register = [
//   upload.single("image"), // middleware to handle single image upload
exports.register=
  async (req, res) => {
    const { name, email, password, age, phoneNumber, confirmPassword,image } = req.body;

    // Input validation
    if (!name || !email || !password || !age || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      // Check if student already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        if(existingStudent.email=="admin@gmail.com")
        {
            return res.status(400).json({ message: "Cannot create multiple admins" });
        }
        else{
            return res.status(400).json({ message: "Student already registered with this email" });
        }
      }

      // Assign role based on email. If email is admin@gmail.com, role is 'admin'.
      const role = email === "admin@gmail.com" ? "admin" : "student";

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new student document
      const student = new Student({
        name,
        email,
        password: hashedPassword,
        age,
        phoneNumber,
        image:image,
        role: role, // Dynamically set role based on email
      });

      const newStudent = await student.save();

      res.status(200).json({
        studentinfo: newStudent,
        message: (role=="admin")?"Admin registered successfully":"Student registered successfully",
       
      });

    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  }
// ,];


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const student = await Student.findOne({ email });
     console.log(student)
    if (!student) {
      return res.status(401).json({ message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      studentinfo: {
        name: student.name,
        email: student.email,
        role: student.role,
        image: student.image,
        age:student.age,
        testStatus:student.testStatus,
        correctAnswers: student.correctAnswers,
        
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};






exports.getUserProfile = async (req, res) => {
  try {
    // The `req.user` comes from the verifyToken middleware
    const student = await Student.findById(req.student.id).select("-password"); // Exclude password from response

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      studentinfo: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        age: student.age,
        phoneNumber: student.phoneNumber,
        image: student.image,
        testStatus: student.testStatus,
        correctAnswers: student.correctAnswers,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


// const fetchUserProfile = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/user/profile", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token in headers
//         },
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log("User Profile:", data.user);
//       } else {
//         console.error("Error:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };
  


// Update Answer Count
// exports.studentupdate= async (req, res) => {
//   const { correctAnswers ,testStatus} = req.body; // Assuming you're sending the count from the frontend

//   try {
//     const student = await Student.findById(req.student.id).select("-password"); // Exclude password from response

//     if (!student) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     student.correctAnswers = correctAnswers;
//     student.testStatus=testStatus;


//     await student.save();

//     res.status(200).send({ message: 'Answers saved successfully', correctAnswers: student.correctAnswers,testStatus:student.testStatus});
//   } catch (err) {
//     res.status(500).send({ message: 'Server error', error: err.message });
//   }
// }





exports.studentupdate = async (req, res) => {
  const { correctAnswers, testStatus } = req.body; // Assuming you're sending the count from the frontend

  try {
    const student = await Student.findById(req.student.id).select("-password"); // Exclude password from response

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that are changing
    student.correctAnswers = correctAnswers;
    student.testStatus = testStatus;

    await student.save();

    // Prepare the response data (excluding the fields that were updated)
    const studentDetails = {
      name: student.name,
      email: student.email,
      // Include other details that were not updated here
      correctAnswers: student.correctAnswers,
      testStatus: student.testStatus,
      // Any other fields you want to include:
      age:student.age,
      phoneNumber: student.phoneNumber,
      // Add more fields as needed
    };

    res.status(200).send({
      message: 'Answers saved successfully',
      studentinfo: studentDetails,
    });
  } catch (err) {
    res.status(500).send({ message: 'Server error', error: err.message });
  }
};

