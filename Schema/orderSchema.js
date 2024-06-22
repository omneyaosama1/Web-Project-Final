const mongoose = require("mongoose");
const moment = require("moment");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentInfo: {
      cardNum: {
        type: String,
        match: [/^\d{16}$/, "Make sure that the card number is 16-digits."],
        required: true,
      },
      expDate: {
        type: String,
        required: true,
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    deliveryDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;