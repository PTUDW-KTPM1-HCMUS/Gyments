const express = require('express');
const router = express.Router();

/* GET products page. */
router.get('/', function(req, res, next) {
    res.render('products');
});

module.exports = router;
