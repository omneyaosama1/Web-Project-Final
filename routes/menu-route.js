const express = require('express');
const router = express.Router();
const { getMenu, addRecipe, deleteRecipe, updateRecipe } = require('../controllers/menuControllers');


router.get('/', getMenu);
router.post('/add', addRecipe);
router.delete('/delete/:id', deleteRecipe);
router.put('/update/:id', updateRecipe);



module.exports = router;

