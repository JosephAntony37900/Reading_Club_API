require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const secretKey = process.env.SECRET_KEY; 

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name_User, passwords } = req.body;

    // Encriptar la contraseña antes de guardarla
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

// Inicio de sesión de usuario
const loginUser = async (req, res) => {
  try {
    const { name_User, passwords } = req.body;

    const user = await User.findOne({ where: { name_User } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Comparar la contraseña proporcionada con el hash almacenado
    const isMatch = await bcrypt.compare(passwords, user.passwords);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
      expiresIn: '1h' // Token expira en 1 hora
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => { // Asegúrate de que el token esté correctamente formateado
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

/*
// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
*/
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  verifyToken,
  getUserProfile
};
