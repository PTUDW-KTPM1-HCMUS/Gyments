const express = require('express');
const router = express.Router();
const userController = require('./UserController');
const { route } = require('../auth/auth');
const guard = require('../auth/AuthController');

router.get('/cart', userController.cart);
router.get('/account', guard.loginGuard, userController.account);
router.get('/logout',guard.loginGuard, userController.logOut);
router.get('/changepass',guard.loginGuard, userController.changepassPage);
router.post('/changepass',guard.loginGuard, userController.changepass);

module.exports = router;
