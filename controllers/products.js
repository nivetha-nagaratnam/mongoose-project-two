const Product = require('../models/product');

function show(req, res) {
  Product.findById(req.params.id).populate('img').exec(function(err, product) {
    res.render('products/show', { title: 'Product Detail', product});
  });
}

function index(req, res) {
  Product.find({}, function(err, product) {
  res.render('products/index',{ title: 'All Products', product})
  });
}

function newProduct(req, res) {
    res.render('products/new',{ title: 'Add Product' });
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

function deleteProduct(req, res) {
  Product.findByIdAndRemove(req.params.id,function(err, product){
    res.redirect('/')
  });
}


module.exports = {
    new: newProduct,
    create,
    index,
    show,
    delete:deleteProduct
  };