/**
 * Global Error Handler Middleware
 * --------------------------------
 * Catches and handles all errors passed through `next(err)`.
 * 
 * - Logs the error to the console.
 * - Sends a 500 Internal Server Error response by default.
 * - Includes the error message in the JSON response.
 * 
 */

const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  };
  
  module.exports = errorHandler;