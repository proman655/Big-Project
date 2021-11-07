const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserRoutes = require("./routes/userRoutes");
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(express.json());
app.listen(port, () => console.log(`Server started on ${port}`));

//base
app.get("/", (req, res) => {
    res.send("API is running..");
});

app.use('/api/user', UserRoutes);

