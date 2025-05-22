const db = require('../config/db');

const createPost = async (title, content, userId, tagIds) => {
  const [result] = await db.execute(
    'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, userId]
  );
  const postId = result.insertId;

  for (const tagId of tagIds) {
    await db.execute('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)', [postId, tagId]);
  }

  return postId;
};

const getAllPosts = async () => {
  const [rows] = await db.query(`
    SELECT p.id, p.title, p.content, u.username,
           GROUP_CONCAT(t.name) as tags
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    GROUP BY p.id
  `);
  return rows;
};

const getPostById = async (id) => {
  const [rows] = await db.query(`
    SELECT p.id, p.title, p.content, u.username,
           GROUP_CONCAT(t.name) as tags
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    WHERE p.id = ?
    GROUP BY p.id
  `, [id]);
  return rows[0];
};

const updatePost = async (postId, title, content, tagIds) => {
    const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Step 1: Dynamically update title/content if provided
    if (title || content) {
      let fields = [];
      let values = [];

      if (title) {
        fields.push("title = ?");
        values.push(title);
      }
      if (content) {
        fields.push("content = ?");
        values.push(content);
      }

      const updateQuery = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
      values.push(postId);

      await connection.query(updateQuery, values);
    }

    // Step 2: If tags are provided, update post_tags
    if (tagIds) {
      // Delete old tags
      await connection.query(`DELETE FROM post_tags WHERE post_id = ?`, [postId]);

      if (tagIds.length > 0) {
        const tagValues = tagIds.map(tagId => [postId, tagId]);
        await connection.query(
          `INSERT INTO post_tags (post_id, tag_id) VALUES ?`,
          [tagValues]
        );
      }
    }

    await connection.commit();
    return { message: 'Post updated successfully' };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const deletePost = async (id) => {
  await db.execute('DELETE FROM post_tags WHERE post_id = ?', [id]);
  const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
