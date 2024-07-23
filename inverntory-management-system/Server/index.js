require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const { connectMongoDb } = require("./connection");
const flashMiddleware = require("./middleware/flashMiddleware");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/usersRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(flashMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "css")));
app.use(bodyParser.json());

connectMongoDb(process.env.MONGODB_URI);

app.use(authRoutes);
app.use(itemRoutes);
app.use(orderRoutes);
app.use(userRoutes);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
