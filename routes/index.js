var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WTB' });
});


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/adm');
}

/* GET adm page. */
router.get('/adm/list', isAuthenticated, function(req, res, next) {
  res.render('indexAdm', { title: 'Administration', user: req.user });
});



/* GET login page. */
  router.get('/adm', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('login', { message: req.flash('message') });
  });
 
  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/adm/list',
    failureRedirect: '/adm',
    failureFlash : true 
  }));
 
  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });
 
  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/adm/list',
    failureRedirect: '/signup',
    failureFlash : true 
  }));

module.exports = router;
