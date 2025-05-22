/**
 * User Routes
 * ------------
 * Defines authentication-related routes for user registration and login.
 * 
 * Routes:
 * - POST /        : Register a new user.
 * - POST /login   : Authenticate an existing user and return a JWT.
 * 
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/', userController.register); 
router.post('/login', userController.login); 

module.exports = router;
