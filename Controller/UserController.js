class UserController{
    
    //[GET] shopping cart
    cart(req,res){
        res.render('user/cart');
    }
}
module.exports = new UserController;