const express = require("express");
const {
  addNewOrder,
  displayUserOwnOrder,
  displayAllUserOrder,
  deleteOwnOrder,
  deleteAllUserOrders,
} = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/orders", displayAllUserOrder);
router.get("/order", displayUserOwnOrder);
router.post("/order", isAuthenticated, addNewOrder);
router.post("/deleteOrder/:id", isAuthenticated, deleteOwnOrder);
router.post("/deleteOrders/:id", isAuthenticated, deleteAllUserOrders);

module.exports = router;
