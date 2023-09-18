var express = require('express');
var router = express.Router();
require('../model/datastructure')
const mongoose = require('mongoose');


router.get('/login', function(req, res, next) {
  res.render('backend/login', { route: 'Express' });
});


module.exports = router;
