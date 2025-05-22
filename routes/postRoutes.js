/**
 * Post Routes
 * ------------
 * Defines RESTful routes for managing blog posts.
 * 
 * Routes:
 * - POST /         : Create a new post (protected).
 * - GET /          : Get all posts with associated tags.
 * - GET /:id       : Get a single post by its ID.
 * - PUT /:id       : Update a post by its ID (protected).
 * - DELETE /:id    : Delete a post by its ID (protected).
 * 
 * Middleware:
 * - `protect`: Ensures user is authenticated before creating, updating, or deleting posts.
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.route('/:id').put(protect, postController.updatePost);
router.route('/:id').delete(protect, postController.deletePost);

module.exports = router;
