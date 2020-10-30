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
var Image = require('../models/image');

function newProduct(req, res) { 
    Product.findById(req.params.id, function (err, product){ 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('images/new',{title: 'Add Image', product, user: req.user, name: req.query.name}); 
        } 
    }); 
}
  
function create(req, res, next) { 
    
    req.body.product = req.params.id;

    var obj = { 
        img: { 
            data: fs.readFileSync(path.join('uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } ,
    } 

    Image.create(obj, function (err, image){ 
    
        if (err) { 
            console.log(err); 
        } 
        else { 
            Product.findById(req.body.product,function(err, product){
                product.img.push(image._id)
                product.save(function(err){
                    res.redirect(`/products/${req.body.product}`);
                })
            })
        };
    });
        
}; 
  
module.exports = {
    new: newProduct,
    create,
};