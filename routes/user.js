const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const { route } = require('./login');



router.use('/cart', userController.cart);
router.use('logout',userController.logOut);

module.exports = router;
