const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login-signup');
});
const staticEmail = 'yomna@gmail.com';
const staticPassword = 'password123';

// User login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check against static credentials
  if (email === staticEmail && password === staticPassword) {
    req.session.user = { email: staticEmail };
    res.redirect('/admin'); // Redirect to a protected page after login
  } else {
    res.status(401).send('Invalid email or password');
  }
});
module.exports = router;