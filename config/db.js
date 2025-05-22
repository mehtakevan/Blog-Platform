/**
 * Sets up and exports a MySQL connection pool using mysql2/promise.
 * Configuration is loaded from environment variables (.env).
 * Enables efficient, reusable database connections for the app.
 */

const mysql = require('mysql2/promise');
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
