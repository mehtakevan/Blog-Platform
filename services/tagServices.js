const db = require('../config/db');

exports.getAllTags = async () => {
  const [rows] = await db.execute('SELECT * FROM tags');
  return rows;
};
