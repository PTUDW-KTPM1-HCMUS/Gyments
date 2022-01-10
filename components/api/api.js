const express = require('express');
const router = express.Router();
const ApiController = require('./ApiController');

router.post('/products/:productID',ApiController.updateQuantity);
router.get('/product/:productID',ApiController.get_product);
router.post('/product/:productID',ApiController.post_product);
router.delete('/product/:productID',ApiController.delete_product);
router.get('/products',ApiController.get_all);
router.post('/product/:productID/comments', ApiController.postComment);

module.exports = router;