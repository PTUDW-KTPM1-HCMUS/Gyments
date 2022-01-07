const Cart = require('./model/cart');
const Order = require('./model/order');
const AuthModel = require('../auth/AccountModel');
const cloudinary = require('../../utils/cloudinary');
const Comment = require('./model/review');

const getCartPage = async (username)=>{
    let cart = null;
    try{
        cart = await Cart.findOne({customer:username});
        if(cart!=null)
        {
            let cost = 0;
            cart.products.map(item=>{
            cost +=item.totalPrice;
        })
        
        cart = await Cart.findOneAndUpdate({customer:username},{totalPrice:cost});}
        return cart;
    }catch(err){
        console.log(err);
        return null;
    }
}
const changename = async (newName, userID) =>{
    await AuthModel.updateOne({_id: userID}, {$set: {name: newName}});
}
const changeemail = async (newEmail, userID) =>{
    await AuthModel.updateOne({_id: userID}, {$set: {email: newEmail}});
}
const changeaddress = async (newAddress, userID) =>{
    await AuthModel.updateOne({_id: userID}, {$set: {address: newAddress}});
}
const changephone = async (newPhone, userID) =>{
    await AuthModel.updateOne({_id: userID}, {$set: {phone: newPhone}});
}
const changeavatar = async (avatarDetail, userID) => {
    let avatar = null;
    let avatarID= null;
    let imgResult = await cloudinary.uploader.upload(avatarDetail.path);
    avatar = imgResult.secure_url;
    avatarID = imgResult.public_id;
    await AuthModel.updateOne({_id: userID}, {$set: {avatar: avatar, avatarID: avatarID}});
    await Comment.updateMany({userID: userID}, {$set: {userAvatar: avatar}});
    return avatar;
}
const getCart = async (username)=>{
    let cart = null;
    cart = await Cart.findOne({customer:username});
    return cart;
}
const createOrder = async (username)=>{

    let cart = await Cart.findOne({customer:username});
    if(cart!= null)
    {
        let order = null;
        order = await Order.create({
            customerID:cart.customer,
            totalCost: Math.ceil(parseInt(cart.totalPrice)+30),
            products: cart.products,
            date: Date.now(),
            
        });
        cart.products = [];
        cart.totalPrice= 0;
        await cart.save();
        return order;
    }
    return null;
}


module.exports = {getCartPage, changename, changeemail, changeaddress, changephone, changeavatar,createOrder,getCart};
