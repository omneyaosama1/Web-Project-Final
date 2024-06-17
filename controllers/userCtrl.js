const user = require("../Schema/userSchema");

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
    subiscriptionStatus,
    pastOrderIds,
  } = req.body;
  try {
    const newUser = new user({
      userType,
      name,
      password,
      address,
      phoneNumber,
      email,
      visaInfo,
      birthdate,
      image,
      subiscriptionStatus,
      pastOrderIds,
    });
    await newUser.save();
    res.status(201).send("User added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to add user");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
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
    subiscriptionStatus,
    pastOrderIds,
  } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      {
        userType,
        name,
        password,
        address,
        phoneNumber,
        email,
        visaInfo,
        birthdate,
        image,
        subiscriptionStatus,
        pastOrderIds,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to update user");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete the user");
  }
};

module.exports = { addUser, updateUser, deleteUser };
