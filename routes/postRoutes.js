// routes/postRoutes.js
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
