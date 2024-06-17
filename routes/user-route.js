const express = require('express');
const router = express.Router();
const {addUser,updateUser,deleteUser}=require('../controllers/userCtrl');
router.get('/', (req, res) => {
    res.render('user-profile');
});

router.get('/favoriteMeals', (req, res) => {
    res.render('fav-meals');
});


router.get('/history', (req, res) => {
    res.render('user-history');
});


//Add, Update, Delete users
router.post('/add',addUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);

module.exports = router;