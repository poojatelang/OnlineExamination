const express = require('express');
const { getQuestions } = require('../Controllers/quizController.js');



const router = express.Router();

router.get('/questions', getQuestions);


module.exports = router;
