/**
 * Tags Controller
 * ------------------------
 * Fetches and returns the list of all predefined tags.
 * Delegates the data retrieval to the tagService.
 * 
 * Response:
 * - 200 OK with JSON array of tags.
 * - Forwards errors to the global error handler.
 */

const tagService = require('../services/tagServices');

exports.getTags = async (req, res, next) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (err) {
    next(err);
  }
};
