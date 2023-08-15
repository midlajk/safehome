var express = require('express');
var router = express.Router();
const Getrequest = require('../controller/getrequests');
const isadmin = require('../middleware/isadmin');
const isadminapi = require('../middleware/isadminapi');

/* GET home page. */
router.get('/editproperties', Getrequest.editproperty);

router.get('/enquiries',isadmin, Getrequest.getenquiries);
router.get('/adminmanagement',Getrequest.adminmanagement);


router.get('/addproperty',isadmin, Getrequest.getaddproperty);

router.get('/properties',isadmin, Getrequest.getproperties);
router.get('/category',isadmin, Getrequest.getcategory);
router.get('/places',isadmin, Getrequest.getplaces);



router.get('/featured',isadmin, Getrequest.getfeatured);


//////
router.get('/categorylist',isadminapi, Getrequest.categorylist);
router.get('/placelist',isadminapi, Getrequest.placelist);

////
router.get('/enquirieslist',isadminapi, Getrequest.enquiries);
router.delete('/deleteenquiries/:id',isadminapi, Getrequest.deleteenquiries);
//////////////
router.get('/propertieslist',isadminapi, Getrequest.propertieslist);
router.delete('/deleteproperty/:id',isadminapi, Getrequest.deleteproperty);

router.get('/featuredpropertieslist',isadminapi, Getrequest.Featuredpropertieslist);

module.exports = router;