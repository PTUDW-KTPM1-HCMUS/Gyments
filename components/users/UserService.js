const Cart = require('./model/cart');
const Product = require('../products/model/ProductModel')
const AuthModel = require('../auth/AccountModel');
const cloudinary = require('../../utils/cloudinary');


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
    return avatar;
}

module.exports = {getCartPage, changename, changeemail, changeaddress, changephone, changeavatar};
