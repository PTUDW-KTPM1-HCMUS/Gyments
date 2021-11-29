const siteRouter = require('../routes/site');
const productRouter = require('../routes/product');
const userRouter = require('../routes/user');
const createError = require("http-errors");
function route(app)
{

  //product page
  app.use('/product', productRouter);

  //user page
  app.use('/user', userRouter);

  //site page
  app.use('/', siteRouter);

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
}

module.exports = route;
