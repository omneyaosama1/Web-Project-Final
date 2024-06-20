const User = require("../Schema/userSchema");
const Meal = require("../Schema/cookbookMealSchema");

const renderUserPage = async (req, res) => {
    if (!req.session.loggedUser) {
        req.session.loggedUser = await User.findById(req.session.userId);
    }
    res.render("user-profile", { user: req.session.loggedUser });
};

const renderFavMealsPage = async (req, res) => {
    if (!req.session.loggedUser) {
        req.session.loggedUser = await User.findById(req.session.userId);
    }
    res.render("fav-meals", { user: req.session.loggedUser });
};

const renderUserHistoryPage = async (req, res) => {
    if (!req.session.loggedUser) {
        req.session.loggedUser = await User.findById(req.session.userId);
    }
    res.render("user-history", { user: req.session.loggedUser });
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
