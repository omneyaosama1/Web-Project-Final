const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('user-profile');
});

router.get('/favoriteMeals', (req, res) => {
    res.render('fav-meals');
});


router.get('/history', (req, res) => {
    res.render('user-history');
});

module.exports = router;