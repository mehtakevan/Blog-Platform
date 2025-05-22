// controllers/userController.js
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');
const generateToken = require('../utils/generateToken');
const { hashValue, compareValue } = require('../utils/hash');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existing = await userServices.findByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await hashValue(password);
    const userId = await userServices.createUser(username, email, hashedPassword);
    res.status(201).json({ userId, message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await compareValue(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
