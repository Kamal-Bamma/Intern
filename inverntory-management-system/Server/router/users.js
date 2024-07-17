const express = require("express");
const User = require("./models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", { users });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", { users }); // Pass users data to the users.ejs template
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/edit/:id", async (req, res) => {
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
router.post("/edit/:id", async (req, res) => {
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
router.post("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
