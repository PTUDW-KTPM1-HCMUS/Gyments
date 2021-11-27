class UserController{
    //[GET] login Page
    login(req,res){
        res.render('user/login');
    }

    //[GET] register Page
    register(req,res){
        res.render('user/register');
    }
    //[GET] shopping cart
    cart(req,res){
        res.render('user/cart');
    }
}
module.exports = new UserController;