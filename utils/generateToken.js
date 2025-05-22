/**
 * Token Generator
 * ---------------
 * Generates a JWT token using the user's email.
 * 
 * Parameters:
 * - email (string): The email to embed in the JWT payload.
 * 
 * Returns:
 * - A JWT token string valid for 30 days.
 * 
 * Uses:
 * - jsonwebtoken to sign the token with a secret from environment variables.
 */

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;