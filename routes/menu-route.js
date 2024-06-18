const express = require('express');
const router = express.Router();
const {getMenu, addRecipe}=require('../controllers/menuControllers');
router.get('/', getMenu);
router.post('/add',addRecipe);

module.exports = router;
