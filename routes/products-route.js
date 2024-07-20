const express = require('express');
const router = express.Router();
const Meal = require('../Schema/mealSchema'); 
const mealCtrl = require('../controllers/cookbookCtrl');

// router.post('/edit', async (req, res) => {
//     try {
//         const { id, name, description, cookTime, difficulty, image } = req.body;
//         await Meal.findByIdAndUpdate(id, { name, description, cookTime, difficulty, image });
//         res.redirect('/products'); // Redirect to the products page
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Failed to edit meal');
//     }
// });

router.get('/',mealCtrl.getMealsAdmin);

router.post('edit/:id',mealCtrl.updateMeal);

router.post('/add', mealCtrl.addMeal);

router.post('/delete/:id',mealCtrl.deleteMeal);

module.exports = router;