const express = require("express");
const router = express.Router();
const Order = require("../Schema/orderSchema");
const User = require("../Schema/userSchema");
const Recipe = require("../Schema/mealSchema");
const { checkAdminAuth } = require("../middleware/userAuthenticator");

router.get("/", checkAdminAuth, async (req, res) => {
    try {
        const totalMenuItems = await Recipe.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalCustomers = await User.countDocuments();

        res.render("analytics", {
            totalMenuItems,
            totalOrders,
            totalCustomers,
        });
    } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
