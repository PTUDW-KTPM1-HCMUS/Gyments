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
}
module.exports = new UserController;