const express = require('express');
const router = express.Router();
const Meal = require('../Schema/mealSchema'); // Adjust the path if needed
const mealCtrl = require('../controllers/cookbookCtrl');
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find(); // Fetch all meals from the database
        res.render('products', { meals }); // Pass meals to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { id, name, description, cookTime, difficulty, image } = req.body;
        await Meal.findByIdAndUpdate(id, { name, description, cookTime, difficulty, image });
        res.redirect('/products'); // Redirect to the products page
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to edit meal');
    }
});

// Route to delete a meal
router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Meal.findByIdAndDelete(id);
        res.redirect('/products'); // Redirect to the products page
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete meal');
    }
});
router.get('/', mealCtrl.getMealsAdmin);
router.post('/add', mealCtrl.addMealAdmin);
module.exports = router;