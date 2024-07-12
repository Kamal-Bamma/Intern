const mongoose = require("mongoose");

// Schema
const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
    unique: true,
  },
  item_price: {
    type: Number,
    required: true,
  },
  item_number: {
    type: Number,
    required: true,
  },
});

// Model
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
