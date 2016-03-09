var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
//var users = require('./routes/users');
var players = require('./routes/players');
var admin_players = require('./routes/admin-players');


var app = express();

//MONGODB
mongoose = require('mongoose'),
fs = require('fs');

//var mongoUri = 'mongodb://nacho:nacho@ds011258.mlab.com:11258/heroku_6g7p6vrk';
var mongoUri = 'mongodb://localhost:27017/WTB';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});
//---

//PASSPORT
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
app.use(expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


// MULTER - SUBIR ARCHIVOS
/*var storage = multer.diskStorage({
  destination : function (req, file, cb){
    cb(null, '/adminApp/files')
  },
  filename : function (req, file, cb){
    cb(null, file.fieldname + '-'+ Date.now())
  }
});
var upload = multer({ storage : storage}).array();*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'adminApp')));

app.use('/', routes);
//app.use('/users', users);
app.use('/api/players', players);
app.use('/api/admin/players', admin_players);

// MODELS
require('./models/player');
require('./models/jugTest');


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


module.exports = app;
