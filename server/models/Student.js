
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  age: { type: Number, required: true }, // Age field
  image: { 
    type: String, 
    default: "https://unsplash.com/photos/a-man-in-a-white-shirt-is-posing-for-a-picture-mRVP1c59wko" // Default profile image
  },
  testStatus: { 
    type: String, 
    enum: ["attended", "not attended"], 
    default: "not attended" 
  },
  phoneNumber:{type: Number, required: true},
  correctAnswers: { type: Number, default: 0 } // Number of correct answers
}, { timestamps: true });

// export default mongoose.model("Student", studentSchema);

module.exports = mongoose.model("Student", studentSchema);