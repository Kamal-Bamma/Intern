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

app.get("/chat", (req, res) => {
  res.render("chat"); // This will use 'layout.ejs' as the layout
});

app.get("/", (req, res) => {
  res.send("Hello User !");
});

// Existing imports and setup
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

app.use(authRoutes);
app.use(userRoutes);
app.use(messageRoutes);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
