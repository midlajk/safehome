var express = require('express');
var router = express.Router();
const controller = require('../controller/postrequest');
const AuthController = require('../controller/authcontroller');
const Posts = require('../controller/postrequest');
const isadmin = require('../middleware/isadmin');
const isadminapi = require('../middleware/isadminapi');

/* GET home page. */

router.post('/admincontrollerlogin', AuthController.postlogin);
router.get('/admincontrollerlogout',isadmin, AuthController.logout);
router.post('/admincontrolleradminmanagement', AuthController.adminmanagement);


router.post('/admincontrolleraddcategory',isadminapi, Posts.addcategory);
router.post('/admincontrollerdeletecategory',isadminapi, Posts.deletecategory);

router.post('/admincontrolleraddfeatures',isadminapi, Posts.addfeatures);
router.post('/admincontrollerdeletefeature',isadminapi, Posts.deletefeature);


router.post('/admincontrolleraddplace',isadminapi, Posts.addplace);
router.post('/admincontrollereditplace',isadminapi, Posts.editPlace);
router.post('/admincontrollerdeleteplace',isadminapi, Posts.deleteplace);

// router.get('/admincontrollerservice', Posts.services);
router.post('/admincontrolleraddproperty',isadminapi, Posts.addProperty);
router.post('/admincontrollerposteditproperty',isadminapi, Posts.posteditproperty);

///
router.delete('/admincontrollerdeleteFile',isadminapi, Posts.deleteFile);
router.post('/admincontrolleruploadFiles',isadminapi, Posts.uploadFiles);
router.post('/admincontrolleruploadeditFiles',isadminapi, Posts.uploadeditFiles);

router.post('/admincontrolleraddfeatured',isadminapi, Posts.addfeatured);

////
router.post('/admincontrollerenquiries', Posts.enquiries);

module.exports = router;