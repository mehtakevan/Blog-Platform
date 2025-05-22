/**
 * Post Controller
 * ----------------
 * Handles HTTP request logic for blog posts.
 * Interfaces between routes and postService layer.
 * 
 * Exports:
 * - createPost: Create a new blog post (with optional tags).
 * - getAllPosts: Retrieve all blog posts with associated tags.
 * - getPostById: Fetch a single post by ID (returns 404 if not found).
 * - updatePost: Update a post's title, content, or tags by ID.
 * - deletePost: Delete a post by ID (returns 404 if not found).
 * 
 * All methods handle errors and forward them to the global error handler.
 */

const postService = require('../services/postServices');

const createPost = async (req, res, next) => {
  try {
    const { title, content, tagIds } = req.body;
    const userId = req.user.id;
    const postId = await postService.createPost(title, content, userId, tagIds || []);
    res.status(201).json({ postId, message: 'Post created' });
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content, tagIds } = req.body;
    const updated = await postService.updatePost(req.params.id, title, content, tagIds);
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post updated' });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
