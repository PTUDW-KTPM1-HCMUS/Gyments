var express = require('express');
var router = express.Router();

/* GET why us page. */
router.get('/', function(req, res, next) {
    res.render('whyUs');
});

module.exports = router;
