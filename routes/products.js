const express = require('express');
const router =express.Router();
const ProductController = require('../Controller/ProductController');

router.use('/',ProductController.getall);


// /* GET products page. */
// router.get('/', function(req, res, next) {
//     res.render('products');
// });

module.exports = router;
