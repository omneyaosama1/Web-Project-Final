const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('user-profile');
});

router.get('/favoriteMeals', (req, res) => {
    res.render('fav-meals');
});

module.exports = router;