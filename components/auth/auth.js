const express = require('express');
const router = express.Router();
const LoginController = require('./AuthController');
const passport = require('../../utils/passport');
const upload = require('../../utils/multer');

router.get('/register',LoginController.registerPage);
router.post('/register', upload.single("avatar"), LoginController.register);
router.get('/',LoginController.login);  
router.post('/',function(req,res,next) {
    passport.authenticate('local',function(err,user){
        if(err){
            return next(err);
        }
        if(user.status==false){
            return res.redirect('/login?banned');
        }
        if(user.userType==true){
            return res.redirect('/login?secret');
        }     
        if(!user)
        {
            return res.redirect('/login?invalid');
        }
        req.logIn(user, function(err){
            if(err)return next(err);
            return res.redirect('/');
        })
    })(req,res,next);

})


module.exports = router;