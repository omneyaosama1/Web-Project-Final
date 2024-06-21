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
            };

            await loggedInUser.save();
            req.session.user.subPlan = loggedInUser.subPlan;

            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res
                        .status(500)
                        .send({
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

const handleCredentialForm = async (req, res) => {};

const handlePaymentForm = async (req, res) => {};

module.exports = {
    renderPage,
    formSubmissionHandling,
};
