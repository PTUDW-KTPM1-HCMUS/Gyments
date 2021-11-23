const express = require('express');
const router = express.Router();

/* GET testimonial page. */
router.get('/', function(req, res, next) {
    res.render('testimonial');
});

module.exports = router;
