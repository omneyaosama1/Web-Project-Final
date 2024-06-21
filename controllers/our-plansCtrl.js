const User = require("../Schema/userSchema");
const Meal = require("../Schema/mealSchema");

const renderPage = async (req, res) => {
    res.render("our-plans");
};

const formSubmissionHandling = async (req, res) => {
    console.log("Form submission handling: " + req.body.formNumber_inp);
    console.log(req.body);
    switch (req.body.formNumber_inp) {
        case "1":
            await handlePlanForm(req, res);
            break;
        case "2":
            await handleCredentialForm(req, res);
            break;
        case "3":
            await handlePaymentForm(req, res);
            break;
        default: {
            console.log("Unexecpected form type");
            res.status(400).send("Unexpected form number");
        }
    }
};

const handlePlanForm = async (req, res) => {
    console.log("In credentials function");

    try {
        const {
            "selectedMealTypes_inp[]": selectedMealTypes,
            finalPrice_inp,
            numberOfMeals_inp,
            numberOfPeople_inp,
        } = req.body;
        const loggedInUser = await User.findOne({ _id: req.session.user._id });

        if (loggedInUser) {
            loggedInUser.subPlan = {
                preferences: selectedMealTypes,
                numberOfPeople: numberOfPeople_inp, // Must be one of [2, 4]
                numberOfMeals: numberOfMeals_inp,
                totalamount: finalPrice_inp,
            };

            await loggedInUser.save();
            req.session.user.subPlan = loggedInUser.subPlan;

            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).send({
                        success: false,
                        message: "Failed to save session data",
                    });
                }

                res.send({
                    success: true,
                    message: "Preferences updated successfully",
                });
            });
        } else {
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error.body);
        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
};

const handleCredentialForm = async (req, res) => {
    console.log("In credentials function");

    const {
        firstName_inp,
        lastName_inp,
        email_inp,
        contactNumber_inp,
        address_inp,
    } = req.body;
    try {
        const formData_inp = {
            firstName: firstName_inp,
            lName: lastName_inp,
            email: email_inp,
            contactNumber: contactNumber_inp,
            address: address_inp,
        };
        const loggedInUser = await User.findOne({ _id: req.session.user._id });
        console.log("Logged User: " + loggedInUser);
        console.log(formData_inp);
        if (loggedInUser) {
            loggedInUser.address = formData_inp.address;
            loggedInUser.phoneNumber = parseInt(formData_inp.contactNumber);

            await loggedInUser.save();
            req.session.user.subPlan = loggedInUser.subPlan;

            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).send({
                        success: false,
                        message: "Failed to save session data",
                    });
                }

                res.send({
                    success: true,
                    message: "Credentials updated successfully",
                });
            });
        } else {
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error.body);
        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
};

const handlePaymentForm = async (req, res) => {
    console.log("In payment function");

    const { cardNumber_inp, cardExpDate_inp, cardCVV_inp } = req.body;
    const loggedInUser = await User.findOne({ _id: req.session.user._id });
    try {
        if (loggedInUser) {
            
            if (!loggedInUser.visaInfo) {
                loggedInUser.visaInfo = {};
            }

            loggedInUser.visaInfo.cardNum = cardNumber_inp;
            loggedInUser.visaInfo.expDate = cardExpDate_inp;
            loggedInUser.visaInfo.cvv = cardCVV_inp;
            req.session.user.subPlan = loggedInUser.subPlan;
            console.log(loggedInUser);
            
            await loggedInUser.save();
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).send({
                        success: false,
                        message: "Failed to save session data",
                    });
                }

                res.send({
                    success: true,
                    message: "Payment details updated successfully",
                });
            });
        } else {
            console.log("user not found");
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
};

module.exports = {
    renderPage,
    formSubmissionHandling,
};
