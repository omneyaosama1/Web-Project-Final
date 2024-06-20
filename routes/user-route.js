const express = require('express');
const session = require('express-session');
const router = express.Router();

const app = express();

// Session middleware configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // Example: session expires in 1 hour
}));

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if user session exists
    if (req.session.user) {
      // Check session expiry (optional)
      let currentTime = new Date();
      let sessionExpires = new Date(req.session.cookie._expires); // Assuming _expires is set by your session library
  
      if (currentTime < sessionExpires) {
        // Session is valid, continue
        next();
      } else {
        // Session has expired
        res.clearCookie('session'); // Clear session cookie
        return res.redirect('/logout'); // Redirect to logout endpoint or handle logout logic
      }
    } else {
      // User is not authenticated, redirect to login/signup
      res.redirect('/login-signup');
    }
};

// User profile route
router.get('/', isAuthenticated, (req, res) => {
  res.render('user-profile', { user: req.session.user });
});

// Favorite meals route
router.get('/favoriteMeals', isAuthenticated, (req, res) => {
  res.render('fav-meals', { user: req.session.user });
});

// User history route
router.get('/history', isAuthenticated, (req, res) => {
  res.render('user-history', { user: req.session.user });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Example: Validate credentials and authenticate user
  // Assuming successful authentication:
  if (email === 'sarah@gmail.com' && password === '1234') {
    req.session.user = { email: 'sarah@gmail.com', role: 'user' };
    res.redirect('/user'); // Redirect to user profile page or any other page
  } else {
    res.status(401).send('Invalid email or password');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login-signup'); // Redirect to login/signup page after logout
  });
});

module.exports = router;