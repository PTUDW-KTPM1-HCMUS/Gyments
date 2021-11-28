const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductController');

router.use('/', ProductController.getAllProduct);
router.use('/:productID', ProductController.getProductDetail);

module.exports = router;
