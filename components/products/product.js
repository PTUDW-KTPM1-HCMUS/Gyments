const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

router.get('/:productID', ProductController.getProductDetail);
router.get('/', ProductController.getAllProduct);
// router.get('/category/:ID', ProductController.getAllByCategory);
// router.get('/category')


module.exports = router;
