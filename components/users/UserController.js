const passport = require('passport');
const AuthService = require('../auth/AuthService');
const UserService =require('./UserService');



class UserController{
    
    //[GET] shopping cart
    async cart(req,res){
        if(req.user!=null)
        {
            let username = req.user.username;
            let cart_ =await UserService.getCartPage(username);
            let subtotal = Math.ceil(cart_.totalPrice + 30);
            
            res.render('users/views/cart',{cart:cart_,total:subtotal});
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
    async account(req,res){
        const phone_existed =req.query['phone_existed']!== undefined;
        const email_existed =req.query['email_existed']!== undefined;
        res.render('users/views/account', {phone_existed, email_existed});
    }

    async changepassPage(req,res){
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
    async changename(req, res) {
        const newName = req.body.newName;
        await UserService.changename(newName, req.user._id);
        req.session.passport.user.name = newName;
        res.redirect('/user/account');
    }
    async changeemail(req, res) {
        const newEmail = req.body.newEmail;
        const check_email = await AuthService.findByEmail(newEmail);
        if (check_email){
            res.redirect('/user/account?email_existed');
        }else{
            await UserService.changeemail(newEmail, req.user._id);
            req.session.passport.user.email = newEmail;
            res.redirect('/user/account');
        }
    }
    async changeaddress(req, res) {
        const newAddress = req.body.newAddress;
        await UserService.changeaddress(newAddress, req.user._id);
        req.session.passport.user.address = newAddress;
        res.redirect('/user/account');
    }
    async changephone(req, res) {
        const newPhone = req.body.newPhone;
        const check_phone = await AuthService.findByPhone(newPhone);
        if (check_phone){
            res.redirect('/user/account?phone_existed');
        }else{
            await UserService.changephone(newPhone, req.user._id);
            req.session.passport.user.phone = newPhone;
            res.redirect('/user/account');
        }
    }
    async changeavatar(req, res){
        const newAvatar = await UserService.changeavatar(req.file, req.user._id);
        req.session.passport.user.avatar = newAvatar;
        res.redirect('/user/account');
    }

    async checkoutPage(req,res){
        const cart = await UserService.getCartPage(req.user.username);
        let total = Math.ceil(parseInt(cart.totalPrice) + 30);
        res.render('users/views/checkout',{cart:cart, total:total});
    }

    async checkout(req,res){
        const order = await UserService.createOrder(req.user.username);
        res.redirect('/');
    }
}
module.exports = new UserController;