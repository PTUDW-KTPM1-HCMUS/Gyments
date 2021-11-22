var express = require('express');
var router = express.Router();

/* GET testimonial page. */
router.get('/', function(req, res, next) {
    res.render('testimonial');
});

module.exports = router;
