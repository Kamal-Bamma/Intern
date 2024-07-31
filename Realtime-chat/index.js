require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { connectMongoDb } = require("./connection");

// Connection establishment
const app = express();
const PORT = process.env.PORT || 8001;

// connecting viwes dir
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());

connectMongoDb(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.send("Hello User !");
});

// Existing imports and setup

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

// Existing server start code

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
