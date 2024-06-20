const express = require('express');
const router = express.Router();
const { renderPage, handleLoginorSignup} = require('../controllers/login-signupCtrl');

router.get('/', renderPage);
router.post('/', handleLoginorSignup);

// User logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin');
    }
    console.log('Session expired'); // Log session expired message
    res.clearCookie('connect.sid');
    res.redirect('/login-signup');
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/user');
    }
    console.log('Session expired'); // Log session expired message
    res.clearCookie('connect.sid');
    res.redirect('/login-signup');
  });
});
module.exports = router;