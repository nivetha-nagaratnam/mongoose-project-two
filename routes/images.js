var express = require('express');
var router = express.Router();

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

const imagesCtrl = require('../controllers/image');

router.get('/products/:id/images/new', imagesCtrl.new);
router.post('/products/:id/images', upload.single('image'), imagesCtrl.create);

module.exports = router;
