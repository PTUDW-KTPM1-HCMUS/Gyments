const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');


router.get('/searchPage', ProductController.search);
router.get('/:productID', ProductController.getProductDetail);
router.get('/', ProductController.getAllProduct);



module.exports = router;
