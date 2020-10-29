const Product = require('../models/product');

function show(req, res) {
  Product.findById(req.params.id).populate('img').exec(function(err, product) {
    res.render('products/show', { title: 'Product Detail', product, user: req.user, name: req.query.name});
  });
}

function index(req, res) {
  Product.find({}).populate('img').exec( function(err, product) {
    res.render('products/index',{ title: 'All Products', product, user: req.user, name: req.query.name});
  });
}

function indexLips(req, res) {
  Product.find({category: 'lips'}).populate('img').exec(function(err, product) {
    res.render('products/lips', { title: 'Lip Products', product, user: req.user, name: req.query.name});
  });
}

function indexFace(req, res) {
  Product.find({category: 'face'}).populate('img').exec(function(err, product) {
    res.render('products/face', { title: 'Face Products', product, user: req.user, name: req.query.name});
  });
}

function indexCheeks(req, res) {
  Product.find({category: 'cheeks'}).populate('img').exec(function(err, product) {
    res.render('products/cheeks', { title: 'Cheek Products', product, user: req.user, name: req.query.name});
  });
}

function indexEyes(req, res) {
  Product.find({category: 'eyes'}).populate('img').exec(function(err, product) {
    res.render('products/eyes', { title: 'Eye Products', product, user: req.user, name: req.query.name});
  });
}


function newProduct(req, res) {
    res.render('products/new',{ title: 'Add Product', user: req.user, name: req.query.name});
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
    delete:deleteProduct,
    indexLips,
    indexCheeks,
    indexEyes,
    indexFace,
  
  };