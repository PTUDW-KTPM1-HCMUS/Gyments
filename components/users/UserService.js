const Cart = require('./model/cart');
const Product = require('../products/model/ProductModel')
const getCartPage = async (username)=>{
    let cart = null;
    try{
        cart = await Cart.findOne({customerID:username});
        if(cart!=null)
        {
            let cost = 0;
            cart.products.map(item=>{
            cost +=item.totalPrice;
        })
        cart = await Cart.findOneAndUpdate({customerID:username},{totalPrice:cost});}
        return cart;
    }catch(err){
        console.log(err);
    }
    return cart;
}


module.exports = {getCartPage};
