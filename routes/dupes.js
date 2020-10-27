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

const dupesCtrl = require('../controllers/dupes');

router.get('/products/:id/dupes/new', isLoggedIn, dupesCtrl.new);
router.get('/products/:id/dupes/show', dupesCtrl.show);
router.post('/products/:id/dupes', upload.single('image'), dupesCtrl.create);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.send('Login')
  //res.redirect('/auth/google');
}

module.exports = router;