
const Quiz=require("../models/Quiz")





// Get all questions
exports.getQuestions = async (req, res) => {
    try {
      const questions = await Quiz.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions', error });
    }
  };
