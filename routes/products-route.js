const express = require('express');
const router = express.Router();
const Meal = require('../Schema/mealSchema'); // Adjust the path if needed

router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find(); // Fetch all meals from the database
        res.render('products', { meals }); // Pass meals to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;