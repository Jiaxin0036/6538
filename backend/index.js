require('dotenv').config();

var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const TaskRoute = require("./routes/task");
const UserRoute = require("./routes/user");
const Authroute = require("./routes/auth");

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Database connection
const mongoDB_URL = process.env.MongoDB_URL;
console.log('MongoDB URL:', mongoDB_URL); // Debugging line to ensure the URL is correct

mongoose.connect(mongoDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed", err));

// Starting the application
const port = 8000;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

// Calling the routes
app.use("/api", Authroute);
app.use("/tasks", TaskRoute);
