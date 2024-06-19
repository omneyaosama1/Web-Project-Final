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
    console.log('Session created:', req.session); // Log session info upon login
    res.redirect('/admin'); // Redirect to a protected page after login
  } else {
    res.status(401).send('Invalid email or password');
  }
});

// User logout route

router.get('/logout', (req, res) => {
  console.log('Logout route hit'); // Debug log
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err); // Debug log
      return res.redirect('/admin');
    }
    res.clearCookie('connect.sid');
    console.log('Session destroyed and cookie cleared'); // Debug log
    res.redirect('/login-signup');
  });
});
module.exports = router;
