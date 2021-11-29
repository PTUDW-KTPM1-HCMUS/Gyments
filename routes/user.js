const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');



router.use('/cart', userController.cart);

module.exports = router;
