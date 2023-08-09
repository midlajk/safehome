var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('frontend/index', { route: 'Index' });
});

router.get('/forsale', function(req, res, next) {
  res.render('frontend/forsale', { route: 'Sale' });
});

router.get('/forrent', function(req, res, next) {
  res.render('frontend/forrent', { route: 'Rent' });
});
router.get('/offplan', function(req, res, next) {
  res.render('frontend/offplan', { route: 'Offplan' });
});
router.get('/aboutus', function(req, res, next) {
  res.render('frontend/aboutus', { route: 'aboutus' });
});
router.get('/contact', function(req, res, next) {
  res.render('frontend/contact', { route: 'contact' });
});


module.exports = router;
