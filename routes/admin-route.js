const express = require('express');
const router = express.Router();

function checkAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login-signup');
    }
  }
  
  // Admin route (protected)
  router.get('/', checkAuth, (req, res) => {
    res.render('admin', { email: req.session.user.email });
  });
module.exports = router;