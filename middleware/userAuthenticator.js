const express = require("express");

function checkUserAuth(req, res, next) {
    if (req.session.user) {
        // Check session expiry (optional)
        let currentTime = new Date();
        let sessionExpires = new Date(req.session.cookie._expires); // Assuming _expires is set by your session library

        if (currentTime < sessionExpires) {
            // Session is valid, continue
            next();
        } else {
            // Session has expired
            res.clearCookie("session"); // Clear session cookie
            return res.redirect("/logout"); // Redirect to logout endpoint or handle logout logic
        }
    } else {
        // User is not authenticated, redirect to login/signup
        res.redirect("/login-signup");
    }
}

function checkAdminAuth(req, res, next) {
    // First, check if the session and user object exist
    if (req.session && req.session.user) {
        // Check if the user is an Admin
        if (req.session.user.userType === "Admin") {
            // Check session expiry (optional)
            let currentTime = new Date();
            let sessionExpires = new Date(req.session.cookie._expires); // Assuming _expires is set by your session library

            if (currentTime < sessionExpires) {
                // Session is valid, continue
                next();
            } else {
                // Session has expired
                res.clearCookie("session"); // Clear session cookie
                return res.redirect("/logout"); // Redirect to logout endpoint or handle logout logic
            }
        } else {
            // User is not an Admin, redirect to login/signup
            res.redirect("/login-signup");
        }
    } else {
        // No user is logged in, or session is not valid
        res.redirect("/login-signup");
    }
}


module.exports = { checkUserAuth, checkAdminAuth };
