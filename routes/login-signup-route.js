const express = require('express');
const router = express.Router();
const { renderPage, handleLoginorSignup} = require('../controllers/login-signupCtrl');

router.get('/', renderPage);
router.post('/', handleLoginorSignup);
router.post('/login', async (req, res) => {
  // Assuming you have a function to authenticate user
  const user = await authenticateUser(req.body.email, req.body.password);
  if (user) {
      req.session.user = user;
      res.redirect('/profile');
  } 
});

// User logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin');
    }
    console.log('Session expired::redirect admin'); // Log session expired message
    res.clearCookie('connect.sid');
    res.redirect('/login-signup');
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/user');
    }
    console.log('Session expired::redirect user'); // Log session expired message
    res.clearCookie('connect.sid');
    res.redirect('/login-signup');
  });
});
module.exports = router;