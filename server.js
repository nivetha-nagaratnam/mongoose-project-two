var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

require('./config/database');
require('dotenv/config'); 

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const reviewsRouter = require('./routes/reviews');
const imagesRouter = require('./routes/images');
const dupesRouter = require('./routes/dupes');

var app = express();
var bodyParser = require('body-parser'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/', reviewsRouter);
app.use('/', imagesRouter);
app.use('/', dupesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
