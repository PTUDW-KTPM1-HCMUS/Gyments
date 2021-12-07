const express = require('express');
const router = express.Router();
const userController = require('./UserController');
const { route } = require('../auth/auth');

router.get('/cart', userController.cart);
router.get('/account', userController.account);
router.get('/logout',userController.logOut);
router.get('/changepass',userController.changepassPage);
router.post('/changepass',userController.changepass);

module.exports = router;
