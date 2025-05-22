/**
 * Authentication Middleware - protect
 * ------------------------------------
 * Verifies JWT from the Authorization header (Bearer token).
 * 
 * - Decodes token using JWT_SECRET from environment variables.
 * - Fetches user by email embedded in the token.
 * - Attaches user object to the request (`req.user`) for downstream access.
 * 
 * Responses:
 * - 401 Unauthorized: If token is missing, invalid, or expired.
 * - 404 Not Found: If decoded user does not exist in the database.
 * 
 * Forwards errors to the centralized error handler.
 */

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userService = require("../services/userServices");

dotenv.config();

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userService.findByEmail(decoded.email);
      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        return next(err);
      }

      req.user = user;
      next();
    } catch (error) {
      error.statusCode = 401;
      return next(error);
    }
  } else {
    const error = new Error("Not authorized, no token");
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = { protect };
