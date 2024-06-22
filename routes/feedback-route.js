const express = require("express");
const router = express.Router();
const { getOrderFeedback } = require("../controllers/orderCtrl");

router.get("/", async (req, res) => {
    try {
        const feedback = await getOrderFeedback();
        res.render("feedback", { feedback });
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to load feedback page");
    }
});

module.exports = router;
