const express = require("express");
const {
  addItem,
  editItem,
  deleteItem,
  displayAddItem,
  displayItems,
  displayIndex,
} = require("../controllers/itemController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const Item = require("../models/Items");

const router = express.Router();

router.get("/items", displayItems);
router.get("/addItems", displayAddItem);
router.post("/addItems", isAuthenticated, addItem);
router.get("/editItem/:id", isAuthenticated, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render("editItem", { item });
  } catch (err) {
    res.status(404).json({ message: "Item not found" });
  }
});
router.post("/editItem/:id", isAuthenticated, editItem);
router.post("/deleteItems/:id", isAuthenticated, deleteItem);
router.get("/index", displayIndex);

module.exports = router;
