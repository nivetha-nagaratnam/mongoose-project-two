const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

router.get('/index', productsCtrl.index)
router.get('/lips',productsCtrl.indexLips)
router.get('/eyes',productsCtrl.indexEyes)
router.get('/face',productsCtrl.indexFace)
router.get('/cheeks',productsCtrl.indexCheeks)
router.get('/new', isLoggedIn, productsCtrl.new);
router.get('/:id', isLoggedIn, productsCtrl.show);
router.post('/', isLoggedIn, productsCtrl.create);
router.delete('/:id', isLoggedIn, productsCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.send('Login')
    //res.redirect('/auth/google');
}

module.exports = router;

