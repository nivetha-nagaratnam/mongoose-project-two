const Product = require('../models/product');

function create(req, res) {
    Product.findById(req.params.id, function(err, product) {
      product.reviews.push(req.body);
      product.save(function(err) {
        res.redirect(`/products/${product._id}`);
      });
    });
  }
 
 module.exports = {
   create
 };
 