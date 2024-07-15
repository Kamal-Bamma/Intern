const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");
const Item = require("./models/Items");
const User = require("./models/users");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure you have `path` required at the top of your file

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
  const items = [
    { name: "Chair", price: "Rs.5000", number: 20 },
    { name: "Desk", price: "Rs.7000", number: 10 },
    { name: "Monitor", price: "Rs.15000", number: 15 },
    { name: "Fan", price: "Rs.3500", number: 12 },
  ];
  res.render("index", { items });
});

// Routers add to Display, create and login user account
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", { users });
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
      res.redirect("/login");
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

// Route to display users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", { users }); // Pass users data to the users.ejs template
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User on found" });
    }
    res.render("edit", { user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Route to handle edit form submission
app.post("/edit/:id", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.redirect("/users");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Route to handle delete request for a user
app.post("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
