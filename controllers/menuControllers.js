const mongoose = require("mongoose");
const moment = require("moment");
const Recipe = require("../Schema/mealSchema");
const User = require("../Schema/userSchema");
const Order = require("../Schema/orderSchema");
const userCtrl = require("../controllers/userCtrl");

//show all menu items
const getMenu = async (req, res) => {
    try {
        if (!req.session.user) {
            req.session.user = await User.findById(req.session.userId);
        }
        const user = req.session.user;

        if (user.subscriptionStatus === "Deactivated") {
            res.render("our-plans");
            return;
        }

        const preferences = user.subPlan.preferences;
        console.log("User preferences:", preferences);

        const menuData = await Recipe.find({
            preferences: { $in: preferences },
        });

        const favoriteMeals = user.favoriteMeals || [];

        res.render("menu", { menuData, favoriteMeals });
    } catch (err) {
        console.error("Error fetching recipes:", err);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
};


//show  menu items according to user preferences
// const getMenu = async (req, res) => {
//     try {
//         if (!req.session.user) {
//             req.session.user = await User.findById(req.session.userId);
//         }

//         const user = req.session.user;

//         const preferences = user.subPlan.preferences;
//         console.log('User preferences:', preferences);

//         const menuData = await Recipe.find({ preferences: { $in: preferences } });

//         res.render('menu', { menuData });
//     } catch (err) {
//         console.error('Error fetching recipes:', err);
//         res.status(500).json({ error: 'Failed to fetch recipes' });
//     }
// };

//add new recipe
const addRecipe = async (req, res) => {
    try {
        const {
            name,
            image,
            cookTime,
            difficulty,
            tags,
            prefrences,
            description,
            ingredientsName,
            ingPer2,
            ingPer4,
            instructions,
            allergens,
            utensils,
            nutrition,
            recommendations,
        } = req.body;
        const newRecipe = new Recipe({
            name,
            image,
            cookTime,
            difficulty,
            tags,
            prefrences,

            description,
            ingredientsName,
            ingPer2,
            ingPer4,
            instructions,
            allergens,
            utensils,
            nutrition,
            recommendations,
        });

        await newRecipe.save();
        res.status(201).send("Recipe Added");
    } catch (err) {
        console.log(err);
        res.status(500).send(" Failed to Add");
    }
};

const deleteRecipe = async (req, res) => {
    const userID = req.session.userid;
    console.log(`Received ID: ${id}`);
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(userID);
        if (!deletedRecipe) {
            return res.status(404).send("Recipe Not Found");
        }
        return res.status(200).send("Recipe Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send(" Failed To Delete");
    }
};

const updateRecipe = async (req, res) => {
    const userID = req.session.userid;
    const {
        name,
        description,
        imageUrl,
        cookTime,
        ingredients,
        allergens,
        utensils,
        nutrition,
        recommendations,
    } = req.body;
    console.log(`Received ID: ${id}`);
    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(
            userID,
            {
                name,
                description,
                imageUrl,
                cookTime,
                ingredients,
                allergens,
                utensils,
                nutrition,
                recommendations,
            },
            { new: true }
        );
        if (!updateRecipe) {
            return res.status(404).send("Recipe Not Found");
        }

        await updateRecipe.save();

        return res.status(200).send("Recipe Updated");
    } catch (err) {
        console.log(err);
        res.status(500).send(" Failed To Update");
    }
};

const sessionHandler = async (req, res) => {
    const { operation } = req.body;
    if (operation === "validate-cart") {
        await validateCart(req, res);
    } else if (operation === "remove-cart-item") {
        await removeCartItem(req, res);
    } else if (operation === "toggle-favorite") {
        await toggleFavorite(req, res);
    }
};

const validateCart = async (req, res) => {
    try {
        const mealID = req.body.itemID;
        if (!mongoose.Types.ObjectId.isValid(mealID)) {
            return res.status(400).json({ message: "Invalid meal ID." });
        }

        let user = req.session.user;

        if (!user) {
            return res.status(400).json({ message: "User not logged in." });
        }

        if (!user.subPlan) {
            user.subPlan = { dishes: [], expectedOrders: [] };
        } else {
            if (!Array.isArray(user.subPlan.dishes)) {
                user.subPlan.dishes = [];
            }
            if (!Array.isArray(user.subPlan.expectedOrders)) {
                user.subPlan.expectedOrders = [];
            }
        }

        const limit = 4 * user.subPlan.numberOfMeals;
        console.log("Limit:", limit);

        if (user.subPlan.dishes.length + 1 > limit) {
            if (user.subPlan.expectedOrders.length === 0) {
                // Check if orders are not already created
                const orderLimit = Math.ceil(limit / 4);
                console.log("Order Limit:", orderLimit);

                const orders = [];
                for (let i = 0; i < 4; i++) {
                    const orderDishes = user.subPlan.dishes.slice(
                        i * orderLimit,
                        (i + 1) * orderLimit
                    );
                    const deliveryDate = moment()
                        .add(i + 1, "weeks")
                        .toDate();
                    const newOrder = new Order({
                        user: user._id,
                        address: user.address,
                        dishes: orderDishes,
                        totalAmount: user.subPlan.totalamount / 4,
                        paymentInfo: user.visaInfo,
                        deliveryDate: deliveryDate,
                    });
                    await newOrder.save();
                    orders.push(newOrder._id);
                }

                user.subPlan.expectedOrders = orders;
                await User.findByIdAndUpdate(user._id, {
                    subPlan: user.subPlan,
                });
                req.session.user = await User.findById(user._id);
            }

            return res.status(400).json({
                message:
                    "You have reached the limit of items for your plan. Orders have been created.",
            });
        }

        user.subPlan.dishes.push(mealID);
        await User.findByIdAndUpdate(user._id, { subPlan: user.subPlan });
        req.session.user = await User.findById(user._id);

        console.log("Updated session user:", req.session.user);
        return res.status(200).json({ message: "Item added to cart." });
    } catch (err) {
        console.error("Error validating cart:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

const toggleFavorite = async (req, res) => {
    try {
        const mealID = req.body.itemID;
        if (!mongoose.Types.ObjectId.isValid(mealID)) {
            return res.status(400).json({ message: "Invalid meal ID." });
        }

        let user = req.session.user;
        if (!user) {
            return res.status(400).json({ message: "User not logged in." });
        }

        if (!user.favoriteMeals) {
            user.favoriteMeals = [];
        }

        const favoriteIndex = user.favoriteMeals.indexOf(mealID);
        if (favoriteIndex === -1) {
            user.favoriteMeals.push(mealID);
        } else {
            user.favoriteMeals.splice(favoriteIndex, 1);
        }

        await User.findByIdAndUpdate(user._id, {
            favoriteMeals: user.favoriteMeals,
        });
        req.session.user = await User.findById(user._id);

        const isFavorite = favoriteIndex === -1;
        return res.status(200).json({
            message: isFavorite
                ? "Added to favorites."
                : "Removed from favorites.",
            isFavorite: isFavorite,
        });
    } catch (error) {
        console.error("Error toggling favorite:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


const removeCartItem = async (req, res) => {
    try {
        const mealID = req.body.itemID;
        if (!mongoose.Types.ObjectId.isValid(mealID)) {
            return res.status(400).json({ message: "Invalid meal ID." });
        }

        let user = req.session.user;
        if (!user) {
            return res.status(400).json({ message: "User not logged in." });
        }

        // Remove from dishes array
        user.subPlan.dishes = user.subPlan.dishes.filter(id => id.toString() !== mealID.toString());

        await User.findByIdAndUpdate(user._id, { subPlan: user.subPlan });
        req.session.user = await User.findById(user._id);

        return res.status(200).json({ message: "Item removed from cart." });
    } catch (err) {
        console.error("Error removing item:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    getMenu,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    sessionHandler,
    removeCartItem,
};
