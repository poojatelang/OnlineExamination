const express = require('express');
const { register,login,getUserProfile,studentupdate} = require('../Controllers/authController');
const { verifyToken} =require("../Middlewares/authMiddleware.js")



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/studentUpdate',verifyToken,studentupdate)
router.get("/profile", verifyToken, getUserProfile);


module.exports = router;
