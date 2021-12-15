const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const route = require('./routes');
const passport = require('./utils/passport');
const app = express();
const session = require("express-session");
const Category = require("./components/categories/categoryService");
// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'components')]);
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({secret: process.env.SESSION_SECRET,resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(async function (req, res, next) {
    res.locals.user = req.user;
    let categories = await Category.getAllCategories();
    res.locals.category = categories;
    next();
  })

app.use(express.static(path.join(__dirname, 'public')));
route(app);

module.exports = app;
