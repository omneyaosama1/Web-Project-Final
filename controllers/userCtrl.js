const moment = require("moment");
const User = require("../Schema/userSchema");
const Meal = require("../Schema/mealSchema");
const Order = require("../Schema/orderSchema");

const renderUserPage = async (req, res) => {
    if (!req.session.user) {
        req.session.user = await User.findById(req.session.userId);
    }
    res.render("user-profile", { user: req.session.user });
};

const renderFavMealsPage = async (req, res) => {
    try {
        if (!req.session.user) {
            req.session.user = await User.findById(req.session.userId);
        }

        const user = req.session.user;

        if (user && user.favoriteMeals && user.favoriteMeals.length > 0) {
            // Fetch the favorite meals details from the Meal collection
            const favoriteMeals = await Meal.find({
                _id: { $in: user.favoriteMeals },
            });

            res.render("fav-meals", { favoriteMeals });
        } else {
            res.render("fav-meals", { favoriteMeals: [] });
        }
    } catch (err) {
        console.error("Error rendering favorite meals page:", err);
        res.status(500).send("Server error");
    }
};

const deleteFavMeal = async (req, res) => {
    try {
        const userId = req.session.user._id; // Assuming user is stored in session
        const mealId = req.body.mealID;

        if (!mealId) {
            return res.status(400).send({ message: "Meal ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the meal ID exists in the user's favorite meals
        if (!user.favoriteMeals.includes(mealId)) {
            return res.status(404).send({ message: "Meal not found in favorites" });
        }

        // Remove the meal from the user's favorite meals array
        await User.findByIdAndUpdate(userId, { 
            $pull: { favoriteMeals: mealId }
        });

        // Refresh the session user data
        req.session.user = await User.findById(userId);

        res.status(200).send({ message: "Meal removed from favorites" });
    } catch (error) {
        console.error(`Failed to remove meal from favorites: ${error.message}`);
        res.status(500).send({ message: "Failed to remove meal from favorites" });
    }
};


const renderUserHistoryPage = async (req, res) => {
    try {
        if (!req.session.user) {
            const user = await User.findById(req.session.userId).populate(
                "pastOrderIds"
            );
            if (!user) {
                return res.status(404).send("User not found");
            }
            req.session.user = user;
        }

        const pastOrderIds = req.session.user.pastOrderIds || [];

        const populatedOrders = await Order.find({
            _id: { $in: pastOrderIds },
        }).populate("dishes");

        res.render("user-history", { pastOrders: populatedOrders });
    } catch (err) {
        console.error("Error fetching user or past orders:", err);
        res.status(500).send("Internal Server Error");
    }
};

const handleLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect("/login-signup");
    });
};

const addUser = async (req, res) => {
    const {
        userType,
        name,
        password,
        address,
        phoneNumber,
        email,
        visaInfo,
        birthdate,
        image,
        subscriptionStatus,
        subPlan,
        pastOrderIds,
        favoriteMeals,
    } = req.body;

    try {
        const formattedBirthdate = moment(birthdate, "DD/MM/YYYY").toDate();
        const formattedExpDate = visaInfo?.expDate
            ? moment(visaInfo.expDate, "MM/YYYY").toDate()
            : null;

        const newUser = new User({
            userType,
            name,
            password,
            address,
            phoneNumber,
            email,
            visaInfo: visaInfo
                ? {
                      cardNum: visaInfo.cardNum,
                      cvv: visaInfo.cvv,
                      expDate: formattedExpDate,
                  }
                : undefined,
            birthdate: formattedBirthdate,
            image,
            subscriptionStatus,
            subPlan,
            pastOrderIds,
            favoriteMeals,
        });

        await newUser.save();

        // Assuming you have a session middleware setup
        req.session.user = {
            id: newUser._id, // Assuming MongoDB ObjectId
            name: newUser.name,
            userType: newUser.userType,
            // Add other relevant user data to session as needed
        };

        res.status(201).send("User added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to add user");
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formattedUsers = users.map((user) => ({
            ...user.toObject(),
            visaInfo: user.visaInfo
                ? {
                      ...user.visaInfo,
                      expDate: moment(user.visaInfo.expDate).format("MM/YYYY"),
                  }
                : undefined,
        }));
        res.status(200).json(formattedUsers);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to get users");
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const userById = await User.findById(id);
        if (!userById) {
            return res.status(404).send("User not found");
        }
        const formattedUser = {
            ...userById.toObject(),
            birthdate: moment(userById.birthdate).format("DD/MM/YYYY"),
            visaInfo: userById.visaInfo
                ? {
                      ...userById.visaInfo,
                      expDate: moment(userById.visaInfo.expDate).format(
                          "MM/YYYY"
                      ),
                  }
                : undefined,
        };
        res.status(200).json(formattedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to get user");
    }
};

const handleUserUpdate = async (req, res) => {
    const { updateType } = req.body;

    console.log(updateType);
    if (updateType === "UserCredentials") {
        await updateUser(req, res);
    } else if (updateType === "UserPassword") {
        await updatePassword(req, res);
    } else {
        res.status(400).json({
            success: false,
            message: "Invalid form type provided",
        });
    }
};

const updateUser = async (req, res) => {
    const userID = req.session.user._id;
    const { userName_inp, email_inp, phoneNumber_inp, address_inp } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {
                name: userName_inp,
                email: email_inp,
                phoneNumber: phoneNumber_inp,
                address: address_inp,
            },
            { new: true }
        );

        if (!updatedUser) {
            console.log("User not found");
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Update session user info
        req.session.user = updatedUser;
        console.log("User updated successfully");
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
};

const updatePassword = async (req, res) => {
    console.log("in update password");
    console.log("Session User:", req.session.user); // Debug log
    const { currentPassword_inp, newPassword_inp, confirmPassword_inp } =
        req.body;
    const userID = req.session.user._id;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Check if the current password matches
        if (user.password !== currentPassword_inp) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }
        if (newPassword_inp !== confirmPassword_inp) {
            return res
                .status(400)
                .json({ success: false, message: "Passwords do not match" });
        }
        user.password = newPassword_inp;
        await user.save();
        req.session.user.password = newPassword_inp;

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update password",
        });
    }
};

const deleteUser=async(req,res)=>{
    const userID=req.session.user._id;
    try{
        const deleteUser=await User.findByIdAndDelete(userID);
        if(!deleteUser){
            return res.status(404).send("User not found!");
        }
        req.session.destroy((err)=>{
            if(err){
                console.log("Error destroying session:",err);
                return res.status(500).send("Failed to delete user");
            }
            res.redirect("/");
        });

    }catch(error){
        console.log(error);
        res.status(500).send("Server error: Failed to delete user");
    }
};
const cancelSubscription = async (req, res) => {
    const userID = req.session.user._id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {
                subscriptionStatus: "Deactivated",
                subPlan: null,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Update session user info
        req.session.user = updatedUser;
        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to cancel subscription",
        });
    }
};

const updateCardPaymentInfo = async (req, res) => {
    try {
        const { cardNum, expDate, cvv } = req.body;
        const userId = req.session.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        user.visaInfo = {
            cardNum,
            expDate: expDate ? moment(expDate, "MM/YYYY").toDate() : null,
            cvv,
        };

        await user.save();

        req.session.user = user;

        res.status(200).json({
            success: true,
            message: "Card payment info updated successfully",
            user: req.session.user,
        });
    } catch (err) {
        console.error("Error updating card payment info:", err);
        res.status(500).json({
            success: false,
            message: "Error updating card payment info",
        });
    }
};

module.exports = {
    renderUserPage,
    renderFavMealsPage,
    deleteFavMeal,
    renderUserHistoryPage,
    handleLogout,
    addUser,
    getAllUsers,
    getUserById,
    deleteUser,
    handleUserUpdate,
    cancelSubscription,
    updateCardPaymentInfo,
};
