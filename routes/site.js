const express = require('express');
const router = express.Router();
const SiteController = require('../Controller/SiteController');
const UserController = require('../Controller/UserController');

router.get('/about',SiteController.about);
router.get('/testimonial',SiteController.testimonial);
router.get('/whyUs',SiteController.why);
router.get('/logout',UserController.logOut);
router.get('/',SiteController.homePage);

module.exports = router;