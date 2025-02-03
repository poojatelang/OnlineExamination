const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  type: String,
  difficulty: String,
  category: String,
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);



