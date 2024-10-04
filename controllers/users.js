const { User } = require('../models');
const bcrypt = require('bcrypt'); // for password encryption

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name_User, passwords } = req.body;

    // Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(passwords, 10);

    const user = await User.create({
      name_User,
      passwords: hashedPassword
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { name_User, passwords } = req.body;

    const user = await User.findOne({ where: { name_User } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(passwords, user.passwords);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};
