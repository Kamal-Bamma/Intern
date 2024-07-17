const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  item_name: String,
  item_price: Number,
  item_quantity: Number,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
