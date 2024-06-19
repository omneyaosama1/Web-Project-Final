const moment = require('moment');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: [true, "Please specify the type of user"],
        enum: ["Admin", "User"],
        default:"User",
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
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, "Please enter a valid email address"],
    },
    visaInfo: {
        type: {
            cardNum: {
                type: Number,
                match: [/^\d{16}$/, "Make sure that the card number is 16-digits."]
            },
            cvv: {
                type: Number,
                match: [/^\d{3}$/, "Make sure the CVV is 3-digits"]
            },
            expDate: {
                type: Date,
                required: [true, 'Please enter the expiration date on the card'],
                validate: {
                  validator: function (date) {
                    return moment(date).isAfter(moment());
                  },
                  message: 'Expiration date must be in the future',
                },
              },
        },
        validate: {
            validator: function(v) {
                if (v.cardNum == null && v.cvv == null && v.expDate == null) {
                    return true; // All fields are empty
                }
                return v.cardNum != null && v.cvv != null && v.expDate != null;
            },
            message: 'If providing visa info, all fields (cardNum, CVV, expDate) must be filled.'
        }
    },
    birthdate: {
        type: Date,
        required: [true, "Please enter the birthdate"],
    },
    image: {
        type: String
    },
    subscriptionStatus: {
        type: String,
        enum: ["Activated", "Deactivated"],
        default: "Deactivated"
    },
    pastOrderIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }],
    favoriteMeals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",  // Assuming there is a Meal model with Schema
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
