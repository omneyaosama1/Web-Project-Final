const User = require("../Schema/userSchema");

const renderPage = async (req, res) => {
    res.render("login-signup");
};

const handleSignup = async (req, res) => {
    const { username_inp, email_inp, pass_inp, birthdate_inp } = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email_inp });
        if (existingUser) {
            return res.json({
                success: false,
                message: "Email already in use",
            });
        }
        const newUser = new User({
            name: username_inp,
            password: pass_inp,
            email: email_inp,
            birthdate: birthdate_inp,
        });
        newUser
            .save()
            .then((user) => res.json({ success: true, user }))
            .catch((error) => {
                console.error("Save error:", error);
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.errors,
                });
            });
    } catch (error) {
        console.error(error); // Log the error to see what's going wrong
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    renderPage,
    handleSignup,
};
