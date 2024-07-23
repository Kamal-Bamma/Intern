const BoughtItem = require("../models/orderLists");
const Item = require("../models/Items");

const displayAllUserOrder = async (req, res) => {
  try {
    const ordersList = await BoughtItem.find()
      .populate("item_id")
      .populate("user_id");
    res.render("orders.ejs", { ordersList, user: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const displayUserOwnOrder = async (req, res) => {
  try {
    const ordersList = await BoughtItem.find({ user_id: req.user._id })
      .populate("item_id")
      .populate("user_id");

    res.render("order.ejs", { orderLists: ordersList, user: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addNewOrder = async (req, res) => {
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
};

const deleteOwnOrder = async (req, res) => {
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
};

const deleteAllUserOrders = async (req, res) => {
  try {
    const order = await BoughtItem.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await BoughtItem.findByIdAndDelete(req.params.id);
    res.redirect("/order");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  addNewOrder,
  deleteOwnOrder,
  deleteAllUserOrders,
  displayUserOwnOrder,
  displayAllUserOrder,
};
