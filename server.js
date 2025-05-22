/**
 * Main Application Entry Point
 * ----------------------------
 * Sets up and starts the Express server, loads environment variables,
 * configures middleware, and registers API route handlers.
 * 
 * Middleware:
 * - express.json(): Parses incoming JSON requests.
 * - errorHandler: Handles errors centrally for the application.
 * 
 * Routes:
 * - /api/users: Routes related to user registration and authentication.
 * - /api/posts: Routes for blog post CRUD operations.
 * - /api/tags: Routes to fetch tags.
 * 
 * Starts the server on the specified PORT from environment or defaults to 3000.
 */

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const tagRoutes = require("./routes/tagRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/tags",tagRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

