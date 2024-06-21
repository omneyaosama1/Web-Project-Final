const express = require('express');
const router = express.Router();
const User = require('../Schema/userSchema'); // Adjust the path as needed

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render('usersAdmin', { users }); // Pass users to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;