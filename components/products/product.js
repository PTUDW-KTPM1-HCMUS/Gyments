const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');


router.get('/searchPage', ProductController.search);
router.get('/:productID', ProductController.getProductDetail);
router.get('/', ProductController.getAllProduct);
router.post('/:productID/comments', ProductController.postComment);


module.exports = router;
