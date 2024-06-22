const moment = require('moment');
const User = require('../Schema/userSchema');
const Order=require('../Schema/orderSchema');

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

      const user = await User.findById(req.session.userId).populate('pastOrderIds');
      if (!user) {
        return res.status(404).send('User not found');
      }
      req.session.user = user;
    }

    const pastOrderIds = req.session.user.pastOrderIds || [];

    const populatedOrders = await Order.find({ _id: { $in: pastOrderIds } }).populate('dishes');

    res.render('user-history', { pastOrders: populatedOrders });
  } catch (err) {
    console.error('Error fetching user or past orders:', err);
    res.status(500).send('Internal Server Error');
  }
}

const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/login-signup");
  });
};

const addUser = async (req, res) => {
  const { userType, name, password, address, phoneNumber, email, visaInfo, birthdate, image, subscriptionStatus, subPlan, pastOrderIds, favoriteMeals } = req.body;

  try {
    const formattedBirthdate = moment(birthdate, 'DD/MM/YYYY').toDate();
    const formattedExpDate = visaInfo?.expDate ? moment(visaInfo.expDate, 'MM/YYYY').toDate() : null;

    const newUser = new User({
      userType,
      name,
      password,
      address,
      phoneNumber,
      email,
      visaInfo: visaInfo ? {
        cardNum: visaInfo.cardNum,
        cvv: visaInfo.cvv,
        expDate: formattedExpDate,
      } : undefined,
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

    res.status(201).send('User added successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to add user');
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map(user => ({
      ...user.toObject(),
      visaInfo: user.visaInfo ? {
        ...user.visaInfo,
        expDate: moment(user.visaInfo.expDate).format('MM/YYYY'),
      } : undefined,
    }));
    res.status(200).json(formattedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to get users');
  }
};


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await User.findById(id);
    if (!userById) {
      return res.status(404).send('User not found');
    }
    const formattedUser = {
      ...userById.toObject(),
      birthdate: moment(userById.birthdate).format('DD/MM/YYYY'),
      visaInfo: userById.visaInfo ? {
        ...userById.visaInfo,
        expDate: moment(userById.visaInfo.expDate).format('MM/YYYY'),
      } : undefined,
    };
    res.status(200).json(formattedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to get user');
  }
};

const updateUser = async (req, res) => {
  const userID = req.session.user._id;
  const { name, email, phoneNumber, address } = req.body;

  try {
    const formattedBirthdate = moment(birthdate, 'DD/MM/YYYY').toDate();
    const formattedExpDate = visaInfo?.expDate ? moment(visaInfo.expDate, 'MM/YYYY').toDate() : null;

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {

        name,
        email,
        phoneNumber,
        address,


        visaInfo: visaInfo ? {
          cardNum: visaInfo.cardNum,
          cvv: visaInfo.cvv,
          expDate: formattedExpDate,
        } : undefined,
        birthdate: formattedBirthdate,
        image,
        subscriptionStatus,
        subPlan,
        pastOrderIds,
        favoriteMeals,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    await updatedUser.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to update user');
  }
};

const deleteUser = async (req, res) => {
  const userID = req.session.user._id;

  try {
    const deletedUser = await User.findByIdAndDelete(userID);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to delete user');
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
  updateUser,
  deleteUser
};