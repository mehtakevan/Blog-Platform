/**
 * Tag Service - Retrieves all tags from the database.
 *
 */

const db = require('../config/db');

const getAllTags = async () => {
  const [rows] = await db.execute('SELECT * FROM tags');
  return rows;
};

module.exports = { getAllTags };