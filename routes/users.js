const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, verifyToken, getUserProfile } = require('../controllers/users');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get all users
router.get('/users', verifyToken, getAllUsers);

router.get('/profile', verifyToken, getUserProfile)

module.exports = router;
