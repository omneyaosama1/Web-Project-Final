const express = require('express');
const router = express.Router();
const mealCtrl = require('../controllers/cookbookCtrl');


router.get('/',mealCtrl.getMealsAdmin);

router.put('/update/:id', mealCtrl.updateMeal);

router.post('/add', mealCtrl.addMeal);

router.post('/delete/:id',mealCtrl.deleteMeal);

module.exports = router;