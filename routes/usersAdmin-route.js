const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema"); 
const admin = require("../controllers/adminCtrl");
const {checkAdminAuth} = require("../middleware/userAuthenticator");

router.get("/",checkAdminAuth ,async (req, res) => {
    try {
        const users = await User.find();
        res.render("usersAdmin", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


router.get("/", admin.getUsersAdmin);
router.post("/add", admin.addUserAdmin);
router.post("/edit", admin.editUserAdmin);
router.post("/delete/:id", admin.deleteUserAdmin);
router.get("/search", admin.searchUsers);

module.exports = router;