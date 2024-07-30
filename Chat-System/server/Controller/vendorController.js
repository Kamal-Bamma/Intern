const Vendor = require("../Models/vendorModels");
const bcrypt = require("bcrypt");

const handleDisplayVendorRegister = async (req, res) => {
  res.render("vendorRegister.ejs");
};

const handleDisplayVendorLogin = async (req, res) => {
  res.render("vendorLogin.ejs");
};

const handleRegisterVendor = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    const check = await Vendor.findOne({ email });
    if (check) {
      return res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newVendor = new Vendor({
        name,
        email,
        password: hashedPassword,
        roles,
      });
      await newVendor.save();
      res.redirect("/venorLogin");
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const handleLoginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Vendor.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const handleLogoutVendor = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.redirect("/login");
  });
};

module.exports = {
  handleDisplayVendorRegister,
  handleDisplayVendorLogin,
  handleRegisterVendor,
  handleLoginVendor,
  handleLogoutVendor,
};
