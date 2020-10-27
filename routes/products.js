const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

router.get('/index', productsCtrl.index)
router.get('/new', productsCtrl.new);
router.get('/:id', productsCtrl.show);
router.post('/', productsCtrl.create);
router.delete('/:id', productsCtrl.delete);

module.exports = router;