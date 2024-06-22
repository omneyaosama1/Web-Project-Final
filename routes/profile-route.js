const express = require('express');
const router = express.Router();
const User = require('../Schema/userSchema'); // Adjust the path as needed

router.get('/', async (req, res) => {
    try {
        if (req.session.user && req.session.user.userType === 'Admin') {
            const admin = await User.findById(req.session.user._id).exec();
            if (!admin) {
                return res.status(404).send("Admin not found");
            }
            res.render('profile', { admin });
        } 
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;