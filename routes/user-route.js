const express = require("express");
const router = express.Router();
const user = require("../controllers/userCtrl");

const { checkUserAuth } = require("../middleware/userAuthenticator");

router.get("/", checkUserAuth, user.renderUserPage);

router.get("/favoriteMeals", checkUserAuth, user.renderFavMealsPage);

router.delete("/favoriteMeals", user.deleteFavMeal)

router.get("/history", checkUserAuth, user.renderUserHistoryPage);

router.get("/logout", user.handleLogout);

router.post("/", user.handleUserUpdate);

router.post("/cancel-subscription", user.cancelSubscription);

router.post("/updateCardPaymentInfo",checkUserAuth,user.updateCardPaymentInfo);

router.post("/delete",user.deleteUser);

module.exports = router;
