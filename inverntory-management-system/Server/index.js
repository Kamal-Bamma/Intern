const express = require("express");
const { connectMongoDb } = require("./connection");
const Item = require("./models/Items");
const User = require("./models/users");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8000;

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
connectMongoDb("mongodb://127.0.0.1:27017/Inventory")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => {
    console.error("Failed to connect to MongoDB", e);
  });

// Home route

app.get("/", (req, res) => {
  res.send("Hello Programmer");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

// Routers add to Display, create and login user account
app.get("/users", async (req, res) => {
  try {
    const items = await User.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      return res.json("User added successfully!");
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User doesn't exist");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.redirect("/index");
      } else {
        res.status(400).json("Incorrect password");
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Route to add a new item and display item
app.post("/items", async (req, res) => {
  const { item_name, item_price, item_number } = req.body;

  const newItem = new Item({
    item_name,
    item_price,
    item_number,
  });

  try {
    const check = await Item.findOne({ item_name: item_name });
    if (check) {
      res.json("Exist");
    } else {
      res.json("Items is added..!");
      await Item.insertMany([newItem]);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Route to get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
