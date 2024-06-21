const express = require('express');
const router = express.Router();
const User = require('../Schema/userSchema'); // Adjust the path as needed

router.get('/', async (req, res) => {
    try {
        const userCount = await User.countDocuments(); // Count the number of users
        const adminCount = await User.countDocuments({ userType: 'Admin' }); // Count the number of admins
        const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5); // Fetch the latest 5 users

        res.render('dashboard', { userCount, adminCount, latestUsers }); // Pass data to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;