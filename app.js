var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var doSubmit = require('./routes/doSubmit');
var fileupload = require('./routes/fileupload');
var dbAll = require('./routes/dbAll');
var app = express();
//app.configure(function() {
//    app.use(express.bodyParser()); // used to parse JSON object given in the request body
//});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.post('/dbNew', function(req, res) {
//    res.send('Username: ' + req.body.username);
//});
app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/doSubmit', doSubmit);
app.use('/fileupload', fileupload);
app.use('/dbAll', dbAll);
//app.post('/dbNew', function (req, res) {
//  console.log(req.body);
//})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//var multiparty =require('connect-multiparty');
//var multipartMiddleware = multiparty();
//app.post('/upload', multipartMiddleware ,function(req, resp) {
//  console.log(req.body, req.files);
//  // don't forget to delete all req.files when done
//});
module.exports = app;
