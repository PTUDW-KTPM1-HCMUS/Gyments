const express = require('express');
const router = express.Router();
const AuthController = require('./AuthController');

const upload = require('../../utils/multer');

router.get('/register',AuthController.registerPage);
router.post('/register', upload.single("avatar"), AuthController.register);
router.get('/forgot',AuthController.forgotPage);
router.post('/forgot',AuthController.forgotPass);
router.get('/', AuthController.login);
router.post('/', AuthController.verifyAuthenticate);


module.exports = router;