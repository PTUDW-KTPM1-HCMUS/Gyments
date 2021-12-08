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
        const short = req.query['short']!==undefined;
        res.render('users/views/changepass',{wrongpass,wrongconfirm,short});
    }

    //[POST] change password
    async changepass(req,res){
        const {oldpassword, password,confirmpass} =req.body;
        
        if(!UserService.validPassword(oldpassword,req.user)){
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

                    req.user = await UserService.changepass(req.user,password);
                    res.redirect('/');
                }
            }
        }
    }

    
}
module.exports = new UserController;