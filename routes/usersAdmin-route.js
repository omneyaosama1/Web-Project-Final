const express = require('express');
const router = express.Router();
const User = require('../Schema/userSchema'); // Adjust the path as needed
const userCtrl = require('../controllers/userCtrl');
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render('usersAdmin', { users }); // Pass users to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
 // Adjust the path as needed

router.get('/', userCtrl.getUsersAdmin);
router.post('/add', userCtrl.addUserAdmin);

module.exports = router;