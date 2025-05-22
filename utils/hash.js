/**
 * Hash Utility
 * ------------
 * Provides helper functions for securely hashing and comparing passwords using bcrypt.
 * 
 * Functions:
 * - hashValue(plainTextPassword): Hashes a plain text password with a salt.
 * - compareValue(plainTextPassword, hashedPassword): Compares a plain text password with a hashed password.
 * 
 * Returns:
 * - hashValue: A bcrypt-hashed password string.
 * - compareValue: A boolean indicating whether the passwords match.
 * 
 * Uses:
 * - bcrypt for password hashing and verification.
 */

const bcrypt = require('bcrypt');

const hashValue = async (plainText) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainText, saltRounds);
};

const compareValue = async (plainText, hashedText) => {
  return await bcrypt.compare(plainText, hashedText);
};

module.exports = {
  hashValue,
  compareValue,
};
