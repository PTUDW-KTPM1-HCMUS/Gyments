const express = require('express');
const router = express.Router();
const ApiController = require('./ApiController');

router.get('/product/:productID',ApiController.get_product);
router.post('/product/:productID',ApiController.post_product);
router.get('/products',ApiController.get_all);


module.exports = router;