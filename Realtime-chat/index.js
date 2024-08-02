require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const { connectMongoDb } = require("./connection");

// Connection establishment
const app = express();
const PORT = process.env.PORT || 8001;

// connecting viwes dir
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Creating Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());

connectMongoDb(process.env.MONGODB_URI);

// Example middleware to set a layout
app.use((req, res, next) => {
  res.locals.layout = "layout"; // Default layout
  next();
});

app.get("/", (req, res) => {
  res.send("Hello User !");
});

app.get("/view", async (req, res) => {
  try {
    const users = await User.find();
    res.render("userView", { users: users });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Existing imports and setup
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");
const User = require("./models/Users");

app.use(authRoutes);
app.use(userRoutes);
app.use(messageRoutes);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
