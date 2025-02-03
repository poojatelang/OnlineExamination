
const Quiz=require("../models/Quiz")
const Student = require("../models/Student");










exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find({}, "-password"); // Exclude password field
      res.status(200).json({students:students,message:"All students fetched successfully"});
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Failed to fetch students", error: error.message });
    }
  };


  exports.deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Failed to delete student", error: error.message });
    }
  };
  

exports.getSingleQuestion= async (req, res) => {
    try {
      const question = await Quiz.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



  exports.createQuestion = async (req, res) => {
    try {
      const { type, difficulty, category, question, correctAnswer, options } = req.body;
  
      // Validate required fields
      if (!question || !correctAnswer || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: "Invalid input: Ensure all fields are filled and options are an array with at least two values." });
      }
  
      const newQuestion = new Quiz({
        type,
        difficulty,
        category,
        question,
        correctAnswer,
        options,
      });
  
      const questionInfo = await newQuestion.save();
      res.status(201).json({questionInfo:questionInfo,message:"Question added successfully"});
    } catch (error) {
      console.error("Error saving question:", error);
      res.status(500).json({ message: "Question creation failed", error: error.message });
    }
  };
  











  exports.updateQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const { type, difficulty, category, question, correctAnswer, options } = req.body;
  
      const updatedQuestion = await Quiz.findByIdAndUpdate(
        id,
        { type, difficulty, category, question, correctAnswer, options },
        { new: true, runValidators: true }
      );
  
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({updatedQuestion:updatedQuestion,message: "Question updated sccessfully"});
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ message: "Failed to update question", error: error.message });
    }
  };
  




exports.deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedQuestion = await Quiz.findByIdAndDelete(id);
      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: "Failed to delete question", error: error.message });
    }
  };
  