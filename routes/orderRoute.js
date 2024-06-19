const express = require("express");
const router = express.Router();
const {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderCtrl");

router.post("/add", addOrder);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
