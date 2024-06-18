const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      required: [true, "Please specify the type of user"],
      enum: ["Admin", "User"],
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
      required: [true, "Please enter your address"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please enter the phone number"],
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
    visaInfo:{
        cardNum:{
            type:Number,
            required:[true,"Please enter the card number."],
            match:[/^\d{16}$/, "Make sure that the card number is 16-digits."],
        },
        cvv:{
            type:Number,
            required:[true,"Please enter the CVV of the card"],
            match:[/^\d{3}$/, "Make sure the CVV is 3-digits"],
        },
        expDate:{
            type:Date,
            required:[true,"Please enter the expiration date on the card"],
            validate: {
                validator: function(date) {
                    return date > new Date();
                },
                message: "Expiration date must be in the future",
            },
        },
    },
    birthdate: {
      type: Date,
      required: [true, "Please enter the birthdate"],
    },
    image: {
      type: String,
      required: false,
    },
    subscriptionStatus: {
      type: String,
      enum: ["Activated", "Deactivated"],
    },
    pastOrderIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required:false,
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;