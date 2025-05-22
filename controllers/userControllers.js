/**
 * User Controller
 * ----------------
 * Handles user registration and login operations.
 * Uses userServices for database interaction, and utility functions for hashing and token generation.
 * 
 * Exports:
 * - register: Registers a new user after checking for existing email and hashing the password.
 *   - Response: 201 Created with userId, or 409 Conflict if email exists.
 * 
 * - login: Authenticates user by comparing hashed password and generates JWT token.
 *   - Response: 200 OK with token, or 401 Unauthorized for invalid credentials.
 * 
 * All errors are forwarded to the global error handler middleware.
 */

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

    const token = generateToken(user.email);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
