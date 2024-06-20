const moment = require("moment");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: [true, "Please specify the type of user"],
      enum: ["Admin", "User"],
      default: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    address: {
      type: String,
      required: [false, "Please enter your address"],
    },
    phoneNumber: {
      type: Number,
      required: [false, "Please enter the phone number"],
      match: [/^\d{11}$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    visaInfo: {
      type: {
        cardNum: {
          type: Number,
          match: [/^\d{16}$/, "Make sure that the card number is 16-digits."],
        },
        cvv: {
          type: Number,
          match: [/^\d{3}$/, "Make sure the CVV is 3-digits"],
        },
        expDate: {
          type: Date,
          required: false,
          set: function (v) {
            return v ? moment(v, "MM/YYYY").toDate() : null;
          },
          get: function (v) {
            return v ? moment(v).format("MM/YYYY") : null;
          },
          validate: {
            validator: function (date) {
              return !date || moment(date).isAfter(moment());
            },
            message: "Expiration date must be in the future",
          },
        },
      },
      validate: {
        validator: function (v) {
          const cardNumPresent = v.cardNum != null;
          const cvvPresent = v.cvv != null;
          const expDatePresent = v.expDate != null;

          const allFieldsEmpty =
            !cardNumPresent && !cvvPresent && !expDatePresent;
          const allFieldsPresent =
            cardNumPresent && cvvPresent && expDatePresent;

          return allFieldsEmpty || allFieldsPresent;
        },
        message:
          "If providing visa info, all fields (cardNum, CVV, expDate) must be filled.",
      },
      required: false,
    },
    birthdate: {
      type: Date,
      required: [true, "Please enter the birthdate"],
      set: function (v) {
        return moment(v, "DD/MM/YYYY").toDate();
      },
      get: function (v) {
        return moment(v).format("DD/MM/YYYY");
      },
    },
    image: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
      enum: ["Activated", "Deactivated"],
      default: "Deactivated",
    },
    subPlan: {
      type: {
        preferences: {
          type: [String],
        },
        numberOfPeople: {
          type: Number,
          enum: [2, 4],
          message: "Number of people must be either 2 or 4",
        },
        numberOfMeals: {
          type: Number,
          enum: [1, 2, 3],
          message: "Number of meals must be 1, 2, or 3",
        },
      },
    },
    pastOrderIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    favoriteMeals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal", // Assuming there is a Meal model with Schema
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
