const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

router.get('/index', productsCtrl.index)
router.get('/new', isLoggedIn, productsCtrl.new);
router.get('/:id', productsCtrl.show);
router.post('/', isLoggedIn, productsCtrl.create);
router.delete('/:id', isLoggedIn, productsCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.send('Login')
    //res.redirect('/auth/google');
  }

module.exports = router;