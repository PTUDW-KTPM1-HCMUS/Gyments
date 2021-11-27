const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const route =require('./routes/index');


const productRouter = require('./routes/products');
const productDetailRouter = require('./routes/productDetail');

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


route(app);

// app.use('/products', productRouter);
// app.use('/product_1', productDetailRouter);

// app.use('/users', usersRouter);

app.use('/readAPI/account', accountAPIRouter);
app.use('/readAPI/cart', cartAPIRouter);
app.use('/readAPI/review', reviewAPIRouter);
app.use('/readAPI/product', productAPIRouter);
app.use('/readAPI/order', orderAPIRouter);
app.use('/readAPI/orderDetail', orderDetailAPIRouter);
app.use('/readAPI/customer', customerAPIRouter);
app.use('/readAPI/coupon', couponAPIRouter);
app.use('/readAPI/category', categoryAPIRouter);


module.exports = app;
