const moment = require('moment');
const User = require('../Schema/userSchema');

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
  const { id } = req.params;
  const { userType, name, password, address, phoneNumber, email, visaInfo, birthdate, image, subscriptionStatus, subPlan, pastOrderIds, favoriteMeals } = req.body;

  try {
    const formattedBirthdate = moment(birthdate, 'DD/MM/YYYY').toDate();
    const formattedExpDate = visaInfo?.expDate ? moment(visaInfo.expDate, 'MM/YYYY').toDate() : null;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to update user');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
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
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};