const express = require('express');
const router = express.Router();
const LoginController = require('../Controller/LoginController');
const passport = require('../Models/services/utils/passport');


router.get('/register',LoginController.registerPage);
// router.post('/register',LoginController.register);
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