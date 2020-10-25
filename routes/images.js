var express = require('express');
var router = express.Router();
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
var imgModel = require('../models/image');

// Retriving the image 
router.get('/image', (req, res) => { 
  imgModel.find({}, (err, items) => { 
      if (err) { 
          console.log(err); 
      } 
      else { 
          res.render('images/image', { items: items }); 
      } 
  }); 
}); 

// Uploading the image 
router.post('/', upload.single('image'), (req, res, next) => { 
  
  var obj = { 
      name: req.body.name, 
      desc: req.body.desc, 
      img: { 
          data: fs.readFileSync(path.join('uploads/' + req.file.filename)), 
          contentType: 'image/png'
      } 
  } 
  imgModel.create(obj, (err, item) => { 
      if (err) { 
          console.log(err); 
      } 
      else { 
          // item.save(); 
          res.redirect('images/image'); 
      } 
  }); 
}); 

module.exports = router;
