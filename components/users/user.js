const express = require('express');
const router = express.Router();
const userController = require('./UserController');
const { route } = require('../auth/auth');
const guard = require('../auth/AuthController');
const upload = require('../../utils/multer');

router.post('/checkout',userController.checkout);
router.get('/checkout',userController.checkoutPage);

router.get('/cart', userController.cart);
router.get('/order', guard.loginGuard,userController.showOrder);
router.get('/order/:orderID',guard.loginGuard, userController.showOrderDetail);

router.get('/account', guard.loginGuard, userController.account);
router.get('/logout',guard.loginGuard, userController.logOut);
router.get('/changepass',guard.loginGuard, userController.changepassPage);
router.post('/changepass',guard.loginGuard, userController.changepass);
router.post('/account/changename', guard.loginGuard, userController.changename);
router.post('/account/changeemail', guard.loginGuard, userController.changeemail);
router.post('/account/changeaddress', guard.loginGuard, userController.changeaddress);
router.post('/account/changephone', guard.loginGuard, userController.changephone);
router.post('/account/changeavatar', guard.loginGuard, upload.single("avatar"), userController.changeavatar);



module.exports = router;
