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

const imagesCtrl = require('../controllers/images');

router.get('/products/:id/images/new', isLoggedIn, imagesCtrl.new);
router.post('/products/:id/images', isLoggedIn, upload.single('image'), imagesCtrl.create);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  //res.send('Login')
  res.redirect('/auth/google');
}

module.exports = router;
