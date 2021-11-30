const express = require('express');
const router = express.Router();
const SiteController = require('../Controller/SiteController');


router.get('/login',SiteController.login);
router.get('/register',SiteController.register);
router.get('/about',SiteController.about);
router.get('/testimonial',SiteController.testimonial);
router.get('/whyUs',SiteController.why);

router.get('/',SiteController.homePage);

module.exports = router;