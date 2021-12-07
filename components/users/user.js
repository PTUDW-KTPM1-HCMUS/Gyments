const express = require('express');
const router = express.Router();
const userController = require('./UserController');
const { route } = require('../auth/auth');

router.get('/cart', userController.cart);
router.get('/logout',userController.logOut);

module.exports = router;
