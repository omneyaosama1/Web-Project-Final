const moment = require("moment");
const User = require("../Schema/userSchema");
const Order = require("../Schema/orderSchema");

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

// const updateUser = async (req, res) => {
//   const userID = req.session.user._id;
//   const { name, email, phoneNumber, address } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userID,
//       {
//         name,
//         email,
//         phoneNumber,
//         address,
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).send("User not found");
//     }

//     // Update session user info
//     req.session.user = updatedUser;
//     res.status(200).send("User updated successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to update user");
//   }
// };

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

const deleteUser = async (req, res) => {
    const userID = req.session.user._id;

    try {
        const deletedUser = await User.findByIdAndDelete(userID);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to delete user");
    }
};

const addUserAdmin = async (req, res) => {
    try {
        const {
            name,
            email,
            userType,
            password,
            address,
            phoneNumber,
            birthdate,
        } = req.body;
        const newUser = new User({
            name,
            email,
            userType,
            password,
            address,
            phoneNumber,
            birthdate: moment(birthdate, "YYYY-MM-DD").toDate(),
        });

        await newUser.save();
        res.redirect("/usersAdmin"); // Redirect to the users page
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

const getUsersAdmin = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render("usersAdmin", { users }); // Pass users to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
const editUserAdmin = async (req, res) => {
    const {
        id,
        name,
        email,
        userType,
        password,
        address,
        phoneNumber,
        birthdate,
    } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                userType,
                password,
                address,
                phoneNumber,
                birthdate: moment(birthdate, "YYYY-MM-DD").toDate(),
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.redirect("/usersAdmin"); // Redirect to the users page
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update user");
    }
};

const deleteUserAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send("User not found");
        }

        res.redirect("/usersAdmin"); // Redirect to the users page
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete user");
    }
};
const searchUsers = async (req, res) => {
    const { q } = req.query;

    try {
        const users = await User.find({
            name: { $regex: new RegExp(q, "i") }, // Case-insensitive search
        });

        const formattedUsers = users.map((user) => ({
            ...user.toObject(),
            birthdate: moment(user.birthdate).format("YYYY-MM-DD"),
        }));

        res.render("usersAdmin", { users: formattedUsers });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    renderUserPage,
    renderFavMealsPage,
    renderUserHistoryPage,
    handleLogout,
    addUser,
    getAllUsers,
    getUserById,
    deleteUser,
    getUsersAdmin,
    addUserAdmin,
    editUserAdmin,
    deleteUserAdmin,
    searchUsers,
    handleUserUpdate,
};
