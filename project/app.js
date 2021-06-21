var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser');
const compression = require('compression');
var flash = require('connect-flash');
var fs = require('fs');
var url = require('url');





var app = express();

app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))



 var passport=require('./lib/passport')(app);
// var authRouter = require('./routes/auth')(passport);
var loadingRouter = require('./routes/loading');
var authRouter = require('./routes/auth')(passport);
var mapRouter = require('./routes/map');
var travelRouter = require('./routes/travel');
var galleryRouter = require('./routes/gallery');
var essayRouter = require('./routes/essay');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', loadingRouter);
app.use('/auth',authRouter);
app.use('/map',mapRouter);
app.use('/travel',travelRouter);
app.use('/gallery',galleryRouter);
app.use('/essay',essayRouter);

console.log('app',__dirname);
// app.use('/auth',authRouter);
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
