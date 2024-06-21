const express = require('express');
const router = express.Router();
const {renderPage, formSubmissionHandling} = require("../controllers/our-plansCtrl");
const { checkUserAuth } = require("../middleware/userAuthenticator");

router.get('/', checkUserAuth, renderPage);
router.post('/', formSubmissionHandling);

module.exports = router;