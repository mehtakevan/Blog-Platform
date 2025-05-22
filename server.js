const express = require("express");
const app = express();
const dotenv = require("dotenv");
const pool = require("./config/db");

dotenv.config();

app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

