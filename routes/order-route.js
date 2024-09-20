const express = require("express");
const router = express.Router();
const order = require("../controllers/orderCtrl");

router.post("/add", order.addOrder);
router.get("/all", order.getAllOrders);
router.get("/:id", order.getOrderById);
router.put("/update/:id", order.updateOrder);
router.delete("/delete/:id", order.deleteOrder);
router.post("/rate-order", order.rateOrder);

module.exports = router;
