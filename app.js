var express = require('express');
var i18n = require('i18n-2');
var logger = require('morgan');
var path = require('path');

var home = require('./routes/home');
var editor = require('./routes/editor');

var app = express();

i18n.expressBind(app, {
  extension: '.json',
  locales: ['fr']
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/editor', editor);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
