const express = require('express');
const { register,login,getUserProfile,studentupdate} = require('../Controllers/authController');
const { verifyToken} =require("../Middlewares/authMiddleware.js")



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/studentUpdate',verifyToken,studentupdate)


// // Protected Admin Route
// router.get('/dashboard', verifyToken, adminOnly, (req, res) => {
//     res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
//   });


router.get("/profile", verifyToken, getUserProfile); // Protected Route


module.exports = router;
