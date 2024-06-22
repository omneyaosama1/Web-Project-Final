// profile-route.js
const express = require('express');
const router = express.Router();
const User = require('../Schema/userSchema'); // Adjust the path as needed
const {checkAdminAuth} = require("../middleware/userAuthenticator");

router.get('/',checkAdminAuth ,async (req, res) => {
    try {
        if (req.session.user && req.session.user.userType === 'Admin') {
            const admin = await User.findById(req.session.user._id).exec();
            if (!admin) {
                return res.status(404).send("Admin not found");
            }
            console.log("Rendering profile page for admin:", admin);
            res.render('profile', { admin });
                    } else {
            // Handle case when user is not logged in or userType is not 'Admin'
            res.redirect('/profile'); // Redirect to homepage or login page
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
