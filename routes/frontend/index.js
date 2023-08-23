var express = require('express');
var router = express.Router();
require('../../model/datastructure');

const mongoose = require('mongoose');
const Property = mongoose.model('Property'); // Assuming your model is defined as 'Property'
const Places = mongoose.model('Places');

/* GET home page. */

router.get('/', function(req, res, next) {
  Places.find().then(function(places) {

  res.render('frontend/index', { route: 'Index',location:places });
  })
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
router.post('/search', function(req, res, next) {
  console.log('herrerere')
  Places.find().then(function(places) {

  res.render('frontend/searchview', { route: 'searchcard',response:req.body ,location:places});
  })
});
router.get('/location/:id', function(req, res, next) {
  res.render('frontend/fullgrid', { route: 'location',propertytype:req.params.id });
});
router.get('/buildtypes/:id', function(req, res, next) {
  console.log('buildtypes')
  res.render('frontend/fullgrid', { route: 'buildtypes',propertytype:req.params.i });
});


module.exports = router;
