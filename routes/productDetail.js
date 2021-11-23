const express = require('express');
const router = express.Router();

/* GET product detail page. */
router.get('/', function(req, res, next) {
    res.render('productDetails/product_1');
});

module.exports = router;
