const Item = require("../models/Items");

const displayIndex = async (req, res) => {
  try {
    const items = await Item.find();
    const user_id = req.user ? req.user._id : null;
    res.render("index", { items, user_id, user: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const displayItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.render("items", { items });
  } catch (error) {
    res.status(500).send(error);
  }
};

const displayAddItem = (req, res) => {
  res.render("addItems", { user: req.user });
};

const addItem = async (req, res) => {
  const { item_name, item_price, item_quantity } = req.body;

  try {
    const check = await Item.findOne({ item_name });
    if (check) {
      req.flash("msg", "Item is already added");
      return res.redirect("/addItems");
    } else {
      const newItem = new Item({ item_name, item_price, item_quantity });
      await newItem.save();
      req.flash("msg", "Item added successfully");
      res.redirect("/addItems");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const editItem = async (req, res) => {
  const { item_name, item_price, item_quantity } = req.body;

  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      item.item_name = item_name;
      item.item_price = item_price;
      item.item_quantity = item_quantity;
      await item.save();

      req.flash("msg", "Item updated successfully");
      res.redirect("/editItem/" + req.params.id);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/items");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  displayItems,
  displayAddItem,
  addItem,
  editItem,
  deleteItem,
  displayIndex,
};
