const express = require("express");
const router = express.Router();
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

//     // Example: Validate credentials and authenticate user
//     // Assuming successful authentication:
//     if (email === "sarah@gmail.com" && password === "1234") {
//         req.session.user = { email: "sarah@gmail.com", role: "user" };
//         res.redirect("/user"); // Redirect to user profile page or any other page
//     } else {
//         res.status(401).send("Invalid email or password");
//     }
// });

// Logout route
router.get("/logout", handleLogout);

module.exports = router;
