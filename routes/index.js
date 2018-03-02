var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dev Bliss' });
});

router.get('/ph', function(req, res, next) {
  res.render('ph');
});
module.exports = router;
