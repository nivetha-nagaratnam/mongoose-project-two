// code to upload/retrive images was taken from 
//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

var fs = require('fs'); 

var path = require('path'); 
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()) 
  } 
}); 

var upload = multer({ storage: storage }); 

var Product = require('../models/product');
var Dupe = require('../models/dupe');

function newProduct(req, res) { 
    Product.findById(req.params.id, function (err, product){ 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('dupes/new',{title: 'Add Dupe', product, user: req.user, name: req.query.name}); 
        } 
    }); 
}
  
function create(req, res, next) { 
    
    req.body.product = req.params.id;

    var obj1 = { 
        name: req.body.name, 
        price: req.body.price, 
        imgs: { 
            data: fs.readFileSync(path.join('uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } ,
    } 

    Dupe.create(obj1, function (err, image){ 
    
        if (err) { 
            console.log(err); 
        } 
        else { 
            Product.findById(req.body.product,function(err, product){
                product.imgs.push(image._id)
                product.save(function(err){
                    res.redirect(`/products/${req.body.product}`);
                })
            })
        };
    });
        
}; 

function show(req, res) {
    Product.findById(req.params.id).populate('imgs').exec(function(err, product) {
      res.render('dupes/show', { title: 'Dupes Detail', product, user: req.user, name: req.query.name});
    });
  }

  
module.exports = {
    new: newProduct,
    create,
    show
};