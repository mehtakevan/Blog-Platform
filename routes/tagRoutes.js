/**
 * Tag Routes
 * -----------
 * Defines the route for retrieving all predefined tags.
 * 
 * Routes:
 * - GET / : Returns a list of all available tags.
 * 
 */

const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getTags);

module.exports = router;
