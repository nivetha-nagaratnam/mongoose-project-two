const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

router.get('/new', productsCtrl.new);
router.get('/index', productsCtrl.index)

// POST /products
router.post('/', productsCtrl.create);

module.exports = router;