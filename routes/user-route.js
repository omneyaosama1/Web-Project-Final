const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, addUser, updateUser, deleteUser}=require('../controllers/userCtrl');

const { checkUserAuth } = require("../middleware/userAuthenticator");
const {
    renderUserPage,
    renderFavMealsPage,
    renderUserHistoryPage,
    handleLogout
} = require("../controllers/userCtrl");

// User profile route
router.get("/", checkUserAuth, renderUserPage);

// Favorite meals route
router.get("/favoriteMeals", checkUserAuth, renderFavMealsPage);

// User history route
router.get("/history", checkUserAuth, renderUserHistoryPage);

// // Login route
// router.post("/login", (req, res) => {
//     const { email, password } = req.body;

// Logout route
router.get("/logout", handleLogout);

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