const mongoose = require("mongoose");

const BoughtItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
    required: true,
  },
  no_of_quantity: {
    type: Number,
    default: 1,
    required: true,
  },
});

const BoughtItem = mongoose.model("BoughtItem", BoughtItemSchema);

module.exports = BoughtItem;
