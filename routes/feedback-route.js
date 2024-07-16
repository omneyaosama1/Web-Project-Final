const express = require("express");
const router = express.Router();
const feedback = require("../controllers/feedbackCtrl");

const { checkUserAuth } = require("../middleware/userAuthenticator");

router.post("/add", feedback.addFeedback);
router.get("/get", feedback.getFeedbacks);
router.get("/display", checkUserAuth, feedback.displayFeedback);

module.exports = router;
