const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductController');

router.use('/:productID', ProductController.getProductDetail);
router.use('/', ProductController.getAllProduct);


module.exports = router;
