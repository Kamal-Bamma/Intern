const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");
const Item = require("./models/Items");
const User = require("./models/users");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const BoughtItem = require("./models/orderLists");
const session = require("express-session");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse JSON request bodies and manage sessions
app.use(
  session({
    secret: "sfvbah23rqefq34",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  } else {
    req.user = null;
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "css")));
app.use(bodyParser.json());

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
  res.render("register.ejs", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { user: req.user });
});

app.get("/addItems", (req, res) => {
  res.render("addItems.ejs", { user: req.user });
});

app.get("/navbar", (req, res) => {
  res.render("navbar.ejs", { user: req.user });
});

// Routers to display, create, and login user account
app.get("/users", async (req, res) => {
  const { user_id } = req.params;
  try {
    const users = await User.find();
    res.render("users", { users, user: req.user, user_id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password, is_admin } = req.body;

  try {
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        is_admin,
      });
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
        req.session.user = user; // Set the session user after successful login
        res.redirect("/index");
      } else {
        res.status(400).json("Incorrect password");
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "failed to logout" });
    }
    res.redirect("/login");
  });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

// GET - View all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.render("items", { items });
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Render add item form
app.get("/addItems", (req, res) => {
  res.render("addItems");
});

// POST route to add a new item
app.post("/addItems", async (req, res) => {
  const { item_name, item_price, item_quantity } = req.body;

  try {
    const check = await Item.findOne({ item_name });
    if (check) {
      // check.item_quantity += parseInt(item_quantity);
      return res.status(400).json("Item is already added");
    } else {
      const newItem = new Item({ item_name, item_price, item_quantity });
      await newItem.save();
      res.redirect("/items");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET - Render edit item form
app.get("/editItem/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render("editItem", { item });
  } catch (err) {
    res.status(404).json({ message: "Item not found" });
  }
});

// POST - Update item
app.post("/editItem/:id", async (req, res) => {
  const { item_name, item_price, item_quantity } = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      item.item_name = item_name;
      item.item_price = item_price;
      item.item_quantity = item_quantity;
      await item.save();
      res.redirect("/items");
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST - Delete item
app.post("/deleteItems/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/items");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to fetch items
app.get("/index", async (req, res) => {
  try {
    const items = await Item.find();
    const user_id = req.user ? req.user._id : null;
    res.render("index", { items, user_id, user: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Middleware to ensure user is logged in
const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

// Get route to view all orders for logged-in user
app.get("/order", isAuthenticated, async (req, res) => {
  try {
    // console.log("Logged-in user ID:", req.user._id);
    const ordersList = await BoughtItem.find({ user_id: req.user._id })
      .populate("item_id")
      .populate("user_id");
    // console.log("Orders List:", ordersList);
    res.render("order.ejs", { orderLists: ordersList, user: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post route to add a new order
app.post("/order", isAuthenticated, async (req, res) => {
  // console.log(req.body); // Log the entire request body for debugging
  try {
    const { item_id, no_of_quantity } = req.body;
    const user_id = req.user._id;

    const item = await Item.findById(item_id);

    if (!item || item.item_quantity < no_of_quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough stock." });
    }

    if (!user_id || !item_id || !no_of_quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const orders = new BoughtItem({
      user_id,
      item_id,
      no_of_quantity,
    });
    await orders.save();

    item.item_quantity -= no_of_quantity;
    await item.save();

    res.redirect("/index");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Route to handle delete order request
app.post("/deleteOrder/:id", isAuthenticated, async (req, res) => {
  try {
    const order = await BoughtItem.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this order" });
    }
    await BoughtItem.findByIdAndDelete(req.params.id);
    res.redirect("/order");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
