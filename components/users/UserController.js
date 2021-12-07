const passport = require('passport');
const UserService = require('../auth/LoginService');

class UserController{
    
    //[GET] shopping cart
    cart(req,res){
        res.render('users/views/cart');
    }

    //[GET] logout
    logOut(req,res){
        req.logout();
        res.redirect('/');
    }

    //[GET] account page
    account(req,res){
        res.render('users/views/account');
    }

    changepassPage(req,res){
        const wrongpass = req.query['wrong-pass']!==undefined;
        const wrongconfirm  =req.query['wrong-confirm']!==undefined;
        console.log(req.user);
        res.render('users/views/changepass',{wrongpass,wrongconfirm});
    }

    //[POST] change password
    async changepass(req,res){
        const {oldpassword, password,confirm} =req.body;
        if(!UserService.validPassword(oldpassword,user)){
            return res.redirect('/user/changepass?wrong-pass');
        }
        else{
            if(password!==confirm){
                return res.redirect('/user/changepass?wrong-confirm');
            }
            else{
                console.log(req.user);
                req.user = await UserService.changepass(req.user,passport);
                res.redirect('/');
            }
        }
    }

    
}
module.exports = new UserController;