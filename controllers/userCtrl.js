const User = require("../Schema/userSchema");
const Meal = require("../Schema/cookbookMealSchema");

const renderUserPage = async (req, res) => {
   
    if (!req.session.user) {
        req.session.user = await User.findById(req.session.userId);
    }
    res.render("user-profile", { user: req.session.user });
};

const renderFavMealsPage = async (req, res) => {
    if (!req.session.user) {
        req.session.user = await User.findById(req.session.userId);
    }
    console.log(req.session.user);
    res.render("fav-meals", { user: req.session.user });
};

const renderUserHistoryPage = async (req, res) => {
    if (!req.session.user) {
        req.session.user = await User.findById(req.session.userId);
    }
    res.render("user-history", { user: req.session.user });
};

const handleLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect("/login-signup");
    });
};

module.exports = {
    renderUserPage,
    renderFavMealsPage,
    renderUserHistoryPage,
    handleLogout
};
