// index-route.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const loggedIn = req.session.user ? true : false;
    res.render('index', { loggedIn });
});

module.exports = router;