const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserRoutes = require("./routes/userRoutes");
const ProjectRoutes = require("./routes/projectRoutes");
const port = process.env.PORT || 5000;
const path = require("path");

dotenv.config();
connectDB();
app.use(express.json());
app.listen(port, () => console.log(`Server started on ${port}`));

//enable cors
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
/*
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
  });
}*/

app.use("/api/user", UserRoutes);
app.use("/api/project", ProjectRoutes);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  console.log(error);
}

//app.use("/", (req, res) => {
//res.send("Api is running");
//res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
//});
