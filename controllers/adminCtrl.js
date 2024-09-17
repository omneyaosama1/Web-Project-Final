const moment = require("moment");
const User = require("../Schema/userSchema");

const renderAdminPage = async (req, res) => {
  try {
    if (req.session.user && req.session.user.userType === "Admin") {
      const admin = await User.findById(req.session.user._id).exec();
      if (!admin) {
        return res.status(404).send("Admin not found");
      }
      console.log("Rendering profile page for admin:", admin);
      res.render("profile", { admin });
    } else {
      res.redirect("/login-signup"); // Redirect to homepage or login page
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
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

const addUserAdmin = async (req, res) => {
  try {
    const { name, email, userType, password, address, phoneNumber, birthdate } =
      req.body;

      const usedEmail = await User.findOne({ email });
      if (usedEmail) {
        return res.status(400).json({message:"Email is already in use."});
      }

      if (!moment(birthdate, "DD/MM/YYYY", true).isValid()){
        return res.status(400).json({ message: "Invalid birthdate format. Please use dd/mm/yyyy." });
      }
      const formattedBirhdate=moment(birthdate,"DD/MM/YYYY").toDate();
      const age=moment().diff(formattedBirhdate,'years');
      if(age<18){
        return res.status(400).json({ message: "User must be at least 18 years old." });
      }
    const newUser = new User({
      name,
      email,
      userType,
      password,
      address,
      phoneNumber,
      birthdate: formattedBirhdate,
    });

    await newUser.save();
    res.status(200).json({ message: "User added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Server Error"});
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
    // password,
    // address,
    // phoneNumber,
    // birthdate,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        userType,
        // password,
        // address,
        // phoneNumber,
        // birthdate: moment(birthdate, "YYYY-MM-DD").toDate(),
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

const updateAdminInfo = async (req, res) => {
  const userID = req.session.user._id;
  const { name, email, phoneNumber, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        name,
        email,
        phoneNumber,
        address,
      },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
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

const updateAdminPassword = async (req, res) => {
  const userID = req.session.user._id;
  const { currentPassword_inp, newPassword_inp, confirmPassword_inp } =
    req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.password !== currentPassword_inp) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    if (newPassword_inp !== confirmPassword_inp) {
      return res
        .status(400)
        .json({ success: false, message: "New passwords do not match" });
    }

    user.password = newPassword_inp;
    await user.save();
    req.session.user.password = newPassword_inp;
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update password" });
  }
};
module.exports = {
  renderAdminPage,
  handleLogout,
  getUsersAdmin,
  addUserAdmin,
  editUserAdmin,
  deleteUserAdmin,
  searchUsers,
  updateAdminInfo,
  updateAdminPassword,
};
