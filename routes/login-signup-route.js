const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login-signup');
});

const staticEmail = 'yomna@gmail.com';
const staticPassword = 'password123';
const staticUserEmail = 'sarah@gmail.com';
const staticUserPassword = '1234';


// User login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check against static credentials
  if (email === staticEmail && password === staticPassword) {
    req.session.user = { email: staticEmail };
    console.log('Session created:', req.session); // Log session info upon login
    res.redirect('/admin'); // Redirect to a protected page after login
  }
    else if (email === staticUserEmail && password === staticUserPassword) {
      req.session.user = { email: staticUserEmail, role: 'user' };
      console.log('Session created:', req.session);
      res.redirect('/user'); // Redirect to the user page after login
    } 
    else {
      res.status(401).send('Invalid email or password');
    }
  });

// User logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login-signup');
  });
});

module.exports = router;
