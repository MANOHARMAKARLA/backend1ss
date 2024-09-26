const express = require('express');
const { signup, login,requestOTP,verifyOTP ,logout,updateUser , addToFavorites, removeFromFavorites
} = require('../controllers/authController');
const { verifyToken } = require('../controllers/authMiddleware');

const router = express.Router();

router.post('/signup', signup); // Route for signup
router.post('/login', login); // Route for login
// Route to request OTP for email verification
router.post('/request-otp', requestOTP);

// Route to verify the OTP
router.post('/verify-otp', verifyOTP);
router.post('/logout', logout);

router.put('/update',  updateUser);

router.post('/favorites', addToFavorites);

// Remove from Favorites
router.delete('/favorites', removeFromFavorites);
module.exports = router;
