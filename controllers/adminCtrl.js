const moment = require("moment");
const User = require("../Schema/userSchema");

const handleLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect("/login-signup");
    });
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

module.exports={
    handleLogout,
    getUsersAdmin,
    addUserAdmin,
    editUserAdmin,
    deleteUserAdmin,
    searchUsers,
}