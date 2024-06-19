const express = require('express');
const router = express.Router();
const { renderPage, handleSignup } = require('../controllers/login-signupCtrl');

router.get('/', renderPage);
router.post('/', handleSignup);

module.exports = router;