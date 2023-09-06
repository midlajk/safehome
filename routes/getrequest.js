var express = require('express');
var router = express.Router();
const Getrequest = require('../controller/getrequests');
const isadmin = require('../middleware/isadmin');
const isadminapi = require('../middleware/isadminapi');

/* GET home page. */
router.get('/admincontrollereditproperties', Getrequest.editproperty);

router.get('/admincontrollerenquiries',isadmin, Getrequest.getenquiries);
router.get('/admincontrolleradminmanagement',Getrequest.adminmanagement);


router.get('/admincontrolleraddproperty',isadmin, Getrequest.getaddproperty);

router.get('/admincontrollerproperties',isadmin, Getrequest.getproperties);
router.get('/admincontrollercategory',isadmin, Getrequest.getcategory);
router.get('/admincontrollerplaces',isadmin, Getrequest.getplaces);



router.get('/admincontrollerfeatured',isadmin, Getrequest.getfeatured);


//////
router.get('/admincontrollercategorylist',isadminapi, Getrequest.categorylist);
router.get('/admincontrollerplacelist',isadminapi, Getrequest.placelist);

////
router.get('/admincontrollerenquirieslist',isadminapi, Getrequest.enquiries);
router.delete('/admincontrollerdeleteenquiries/:id',isadminapi, Getrequest.deleteenquiries);
//////////////
router.get('/admincontrollerpropertieslist',isadminapi, Getrequest.propertieslist);
router.delete('/admincontrollerdeleteproperty/:id',isadminapi, Getrequest.deleteproperty);

router.get('/admincontrollerfeaturedpropertieslist',isadminapi, Getrequest.Featuredpropertieslist);

module.exports = router;