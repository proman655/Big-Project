const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserRoutes = require("./routes/userRoutes");
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.listen(port, () => console.log(`Server started on ${port}`));

//base
app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/user", UserRoutes);
