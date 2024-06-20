const express = require("express");
const router = express.Router();
const {checkAdminAuth} = require("../controllers/userAuthenticator");

// Admin route (protected)
router.get("/", checkAdminAuth, (req, res) => {
    res.render("admin", { email: req.session.user.email });
});
module.exports = router;
