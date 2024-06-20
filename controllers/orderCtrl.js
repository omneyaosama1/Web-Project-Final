const Order = require("../Schema/orderSchema");
const User = require("../Schema/userSchema");
const moment = require("moment");

const addOrder = async (req, res) => {
  const { userId, rating, totalAmount, dishes } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    let expDate;
    if (moment(user.visaInfo.expDate, "MM/YYYY", true).isValid()) {
      expDate = moment(user.visaInfo.expDate, "MM/YYYY").format("MM/YYYY");
    } else {
      return res.status(400).send("Invalid expiration date format");
    }

    const newOrder = new Order({
      user: user._id,
      address: user.address,
      dishes,
      totalAmount,
      paymentInfo: {
        cardNum: user.visaInfo.cardNum,
        expDate: user.visaInfo.expDate,
      },
      rating,
    });

    await newOrder.save();
    res.status(201).send("Order added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add order");
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name ")
      .populate("dishes", "name ");

    const formattedOrders = orders.map((order) => {
      const orderObj = order.toObject();
      orderObj.paymentInfo = {
        cardNum: order.paymentInfo.cardNum,
        expDate: order.paymentInfo.expDate,
      };
      return orderObj;
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get orders");
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate("user", "name ")
      .populate("dishes", "name  ");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    const orderObj = order.toObject();
    orderObj.paymentInfo = {
      cardNum: order.paymentInfo.cardNum,
      expDate: order.paymentInfo.expDate,
    };

    res.status(200).json(orderObj);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get order");
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user, dishes, totalAmount, rating } = req.body;

  try {
    const userInfo = await User.findById(user);
    if (!userInfo) {
      return res.status(404).send("User not found");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        user,
        address: userInfo.address,
        dishes,
        totalAmount,
        paymentInfo: {
          cardNum: userInfo.visaInfo.cardNum,
          expDate: userInfo.visaInfo.expDate,
        },
        rating,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }

    const orderObj = updatedOrder.toObject();
    orderObj.paymentInfo = { cardNum: updatedOrder.paymentInfo.cardNum };

    res.status(200).send("Order updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to update order");
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).send("Order not found");
    }

    res.status(200).send("Order deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete order");
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
