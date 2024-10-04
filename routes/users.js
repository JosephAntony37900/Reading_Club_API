const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/users');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get all users
router.get('/', getAllUsers);

module.exports = router;
