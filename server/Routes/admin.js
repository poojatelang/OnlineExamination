const express = require('express');
const { getSingleQuestion ,createQuestion,updateQuestion,deleteQuestion
    ,getAllStudents ,deleteStudent
} = require('../Controllers/adminController');
const { protect,adminOnly} =require("../Middlewares/authMiddleware.js")




const router = express.Router();

router.get('/questions/:id',protect,adminOnly, getSingleQuestion);
router.get('/student',protect,adminOnly,getAllStudents );
router.post('/questions',protect,adminOnly, createQuestion);
router.put('/questions/:id',protect,adminOnly, updateQuestion);
router.delete('/questions/:id',protect,adminOnly, deleteQuestion);
router.delete('/student/:id',protect,adminOnly, deleteStudent);



module.exports = router;
