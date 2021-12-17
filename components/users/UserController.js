const passport = require('passport');
const AuthService = require('../auth/AuthService');
const UserService =require('./UserService');

class UserController{
    
    //[GET] shopping cart
    async cart(req,res){
        if(req.user!=null)
        {
            let username = req.user.username;
            const cart_ =await UserService.getCartPage(username);
            console.log("CART: "+cart_);
            res.render('users/views/cart',{cart:cart_});
        }
        else{
            res.render('users/views/cart');
        }
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
        const short = req.query['short']!==undefined;
        res.render('users/views/changepass',{wrongpass,wrongconfirm,short});
    }

    //[POST] change password
    async changepass(req,res){
        const {oldpassword, password,confirmpass} =req.body;
        
        if(!AuthService.validPassword(oldpassword,req.user)){
            return res.redirect('/user/changepass?wrong-pass');
        }
        else{
            if(password<8){
                return res.redirect('/user/changepass?short');
            }
            else{
                if(password!==confirmpass){
                    return res.redirect('/user/changepass?wrong-confirm');
                }
                else{

                    req.user = await AuthService.changepass(req.user,password);
                    res.redirect('/');
                }
            }
        }
    }

    
}
module.exports = new UserController;