var express = require('express');
var router = express.Router();

title = 'Dev Bliss';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title});
});

router.get('/ph', function(req, res, next) {
  res.render('ph', { title});
});

router.get('/about', function(req, res, next) {
  res.render('about', {title});
});


router.get('/ex', function(req, res, next) {
  res.render('devex', {title});
});

module.exports = router;
