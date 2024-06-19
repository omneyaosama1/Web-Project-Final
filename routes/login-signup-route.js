const express = require('express');
const router = express.Router();
const { renderPage, handleLoginorSignup} = require('../controllers/login-signupCtrl');

router.get('/', renderPage);
router.post('/', handleLoginorSignup);

module.exports = router;