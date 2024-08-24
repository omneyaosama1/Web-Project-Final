const express = require('express');
const router = express.Router();
const { getMeals, addMeal, editMeal, deleteMeal, getById } = require('../controllers/cookbookCtrl');

router.get('/', getMeals);
router.get('/:id',getById);
router.post('/add', addMeal);
router.put('/update/:id', editMeal);
router.delete('/delete/:id', deleteMeal);

module.exports = router;
