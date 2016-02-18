var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WTB' });
});

/* GET adm page. */
router.get('/adm', function(req, res, next) {
  res.render('indexAdm', { title: 'Administration' });
});

module.exports = router;
