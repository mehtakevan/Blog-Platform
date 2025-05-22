/**
 * User Services
 * -------------
 * Handles database operations related to user accounts.
 * 
 * Functions:
 * - createUser(username, email, hashedPassword): Inserts a new user into the database.
 * - findByEmail(email): Retrieves a user record by email.
 * 
 * Uses:
 * - MySQL queries for interacting with the 'users' table.
 */

const db = require('../config/db');

const createUser = async (username, email, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result.insertId;
};

const findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = { createUser, findByEmail };
