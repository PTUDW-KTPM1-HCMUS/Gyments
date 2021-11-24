const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const accountLoginRouter = require('./routes/login');
const accountRegisterRouter = require('./routes/register');
const aboutRouter = require('./routes/about');
const productRouter = require('./routes/products');
const productDetailRouter = require('./routes/productDetail');
const whyUsRouter = require('./routes/whyUs');
const testimonialRouter = require('./routes/testimonial');
const cartRouter = require('./routes/cart');
const accountAPIRouter = require('./routes/readAPI/account');
const cartAPIRouter = require('./routes/readAPI/cart');
const reviewAPIRouter = require('./routes/readAPI/review');
const productAPIRouter = require('./routes/readAPI/product');
const orderAPIRouter = require('./routes/readAPI/order');
const orderDetailAPIRouter = require('./routes/readAPI/orderDetail');
const customerAPIRouter = require('./routes/readAPI/customer');
const couponAPIRouter = require('./routes/readAPI/coupon');
const categoryAPIRouter = require('./routes/readAPI/category');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', accountLoginRouter);
app.use('/register', accountRegisterRouter);
app.use('/about', aboutRouter);
app.use('/products', productRouter);
app.use('/product_1', productDetailRouter);
app.use('/whyUs', whyUsRouter);
app.use('/testimonial', testimonialRouter);
app.use('/users', usersRouter);
app.use('/cart/',cartRouter);
app.use('/readAPI/account', accountAPIRouter);
app.use('/readAPI/cart', cartAPIRouter);
app.use('/readAPI/review', reviewAPIRouter);
app.use('/readAPI/product', productAPIRouter);
app.use('/readAPI/order', orderAPIRouter);
app.use('/readAPI/orderDetail', orderDetailAPIRouter);
app.use('/readAPI/customer', customerAPIRouter);
app.use('/readAPI/coupon', couponAPIRouter);
app.use('/readAPI/category', categoryAPIRouter);


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
