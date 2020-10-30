 const express = require('express');
 const router = express.Router();
 const reviewsCtrl = require('../controllers/reviews');
 
 router.post('/products/:id/reviews', isLoggedIn, reviewsCtrl.create);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    //res.send('Login')
    res.redirect('/auth/google');
  }
 
 module.exports = router;