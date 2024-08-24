const express = require('express');
const router = express.Router();

const mealCtrl = require('../controllers/cookbookCtrl');


router.get('/',mealCtrl.getMealsAdmin);

router.post('/edit',mealCtrl.editMeal);

router.post('/add', mealCtrl.addMeal);

router.post('/delete/:id',mealCtrl.deleteMeal);

module.exports = router;