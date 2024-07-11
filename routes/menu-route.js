const express = require('express');
const router = express.Router();
const { checkUserAuth } = require("../middleware/userAuthenticator");
const { getMenu, addRecipe, deleteRecipe, updateRecipe, sessionHandler } = require('../controllers/menuControllers');

router.get('/', checkUserAuth, getMenu);
router.post('/validate-cart', sessionHandler);
router.post('/toggle-favorite', sessionHandler);
router.post('/add', addRecipe);
router.delete('/delete/:id', deleteRecipe);
router.put('/update/:id', updateRecipe);

module.exports = router;