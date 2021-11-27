const express = require('express');
const router =express.Router();
const SiteController = require('../Controller/SiteController');

router.use('/login',SiteController.login);
router.use('/register',SiteController.register);
router.use('/about',SiteController.about);
router.use('/testimonial',SiteController.testimonial);
router.use('/whyUs',SiteController.why);

router.use('/',SiteController.homePage);

module.exports = router;