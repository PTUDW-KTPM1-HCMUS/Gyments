const UserService = require('../Models/services/LoginService');

class UserController{
    
    //[GET] shopping cart
    cart(req,res){
        res.render('user/cart');
    }

    //[GET] logout
    logOut(req,res){
        req.logout();
        res.redirect('/');
    }
}
module.exports = new UserController;