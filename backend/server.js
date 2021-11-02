const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.listen(5000, console.log('Server started on PORT 5000'));

app.get("/", (req, res) => {
    res.send("API is running..");
});