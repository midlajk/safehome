var express = require('express');
var router = express.Router();
const controller = require('../controller/postrequest');
const AuthController = require('../controller/authcontroller');
const Posts = require('../controller/postrequest');
const isadmin = require('../middleware/isadmin');
const isadminapi = require('../middleware/isadminapi');

/* GET home page. */

router.post('/login', AuthController.postlogin);
router.get('/logout',isadmin, AuthController.logout);
router.post('/adminmanagement', AuthController.adminmanagement);


router.post('/addcategory',isadminapi, Posts.addcategory);
router.post('/deletecategory',isadminapi, Posts.deletecategory);

router.post('/addfeatures',isadminapi, Posts.addfeatures);
router.post('/deletefeature',isadminapi, Posts.deletefeature);


router.post('/addplace',isadminapi, Posts.addplace);
router.post('/editplace',isadminapi, Posts.editPlace);
router.post('/deleteplace',isadminapi, Posts.deleteplace);

// router.get('/service', Posts.services);
router.post('/addproperty',isadminapi, Posts.addProperty);
router.post('/posteditproperty',isadminapi, Posts.posteditproperty);

///
router.delete('/deleteFile',isadminapi, Posts.deleteFile);
router.post('/uploadFiles',isadminapi, Posts.uploadFiles);
router.post('/uploadeditFiles',isadminapi, Posts.uploadeditFiles);

router.post('/addfeatured',isadminapi, Posts.addfeatured);

////
router.post('/enquiries', Posts.enquiries);

module.exports = router;