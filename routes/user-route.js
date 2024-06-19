const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, addUser, updateUser, deleteUser}=require('../controllers/userCtrl');
router.get('/', (req, res) => {
    res.render('user-profile');
});

router.get('/favoriteMeals', (req, res) => {
    res.render('fav-meals');
});


router.get('/history', (req, res) => {
    res.render('user-history');
});


//get all users
router.get('/allUsers', getAllUsers);
//get one user by id
router.get('/:id', getUserById);
//add user
router.post('/add', addUser);
//update info
router.put('/update/:id', updateUser);
//delete user
router.delete('/delete/:id', deleteUser);


module.exports = router;