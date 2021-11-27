const siteRouter = require('./site');
const productRouter = require('./products');
const userRouter = require('./users');
function route(app)
{

  //site page
  app.use('/products', productRouter);

  //user page
  app.use('/users', userRouter);

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
