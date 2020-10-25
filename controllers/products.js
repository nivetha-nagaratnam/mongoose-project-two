const Product = require('../models/product');


function index(req, res) {
  Product.find({}, function(err, product) {
  res.render('products/index', {product})
  });
}

function newProduct(req, res) {
    res.render('products/new');
  }

function create(req, res) {
  const product = new Product(req.body);
  product.save(function(err) {
    // one way to handle errors
    if (err) return res.render('products/new');
    console.log(product);
    // for now, redirect right back to new.ejs
    res.redirect('/products/new');
  });
}


module.exports = {
    new: newProduct,
    create,
    index
  };