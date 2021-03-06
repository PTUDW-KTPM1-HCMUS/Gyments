const Cart = require('./model/cart');
const Order = require('./model/order');
const Product = require('../products/model/ProductModel');
const AuthModel = require('../auth/AccountModel');
const cloudinary = require('../../utils/cloudinary');
const Comment = require('./model/review');

const getCartPage = async (username) => {
    let cart = null;
    try {
        cart = await Cart.findOne({customer: username});
        if (cart != null) {
            let cost = 0;
            cart.products.map(item => {
                cost += item.totalPrice;
            })

            cart = await Cart.findOneAndUpdate({customer: username}, {totalPrice: cost});
        }
        return cart;
    } catch (err) {
        console.log(err);
        return null;
    }
}
const changename = async (newName, userID) => {
    await AuthModel.updateOne({_id: userID}, {$set: {name: newName}});
}
const changeemail = async (newEmail, userID) => {
    await AuthModel.updateOne({_id: userID}, {$set: {email: newEmail}});
}
const changeaddress = async (newAddress, userID) => {
    await AuthModel.updateOne({_id: userID}, {$set: {address: newAddress}});
}
const changephone = async (newPhone, userID) => {
    await AuthModel.updateOne({_id: userID}, {$set: {phone: newPhone}});
}
const changeavatar = async (avatarDetail, userID) => {
    let avatar = null;
    let avatarID = null;
    let imgResult = await cloudinary.uploader.upload(avatarDetail.path);
    avatar = imgResult.secure_url;
    avatarID = imgResult.public_id;
    await AuthModel.updateOne({_id: userID}, {$set: {avatar: avatar, avatarID: avatarID}});
    await Comment.updateMany({userID: userID}, {$set: {userAvatar: avatar}});
    return avatar;
}
const getCart = async (username) => {
    let cart = null;
    cart = await Cart.findOne({customer: username});
    return cart;
}
const createOrder = async (username, name, address, phone) => {

    let cart = await Cart.findOne({customer: username});
    for (let i = 0; i < cart.products.length; i++) {
        await Product.findOneAndUpdate({_id: cart.products[i]._id}, {$set: {quantity: cart.products[i].quantity - cart.products[i].inCart}});
    }
    if (cart != null) {
        let order = null;
        order = await Order.create({
            customerID: cart.customer,
            totalCost: Math.ceil(parseInt(cart.totalPrice) + 30),
            products: cart.products,
            date: Date.now(),
            address: address,
            phone: phone,
            receiver: name
        });
        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();
        return 1;
    }
    return 0;
}
const findHistoryOrder = async (username) => {
    const historyOrder = await Order.find({customerID: username}).lean();
    let products = [];
    for (let i = 0 ; i < historyOrder.length; i++){
        for (let j = 0; j < historyOrder[i].products.length;j++){
            let temp = {};
            temp.time = historyOrder[i].date;
            temp.name = historyOrder[i].products[j].name;
            products.push(temp);
        }
    }
    return products.slice(0, 6);
}

const findOrderList = async (username, page,filter) => {
    let orders = [];
    if (!filter){
        orders = await Order.find({customerID: username}).lean();
    }else{
        orders = await Order.find({customerID: username, status: filter}).lean();
    }

    let next = null;
    let previous = null;
    let totalPage = parseInt(orders.length/4)  + 1;
    let pages = [];
    let currentPage = page;
    if ( page > totalPage){
        currentPage = totalPage;
    }

    for (let i = currentPage - 2;i<=totalPage   ;i++){
        if ( i > 0){
            pages.push({
                number: i,
                filter: filter
            })
        }
    }
    if (currentPage>1){
        previous = currentPage -1;
    }
    if (currentPage<totalPage){
        next = currentPage + 1;
    }
    orders = orders.slice((currentPage-1)*4,currentPage*4 );
    if (orders){
        for (let i = 0; i < orders.length;i++){
            orders[i].number = (currentPage-1)*4 + i + 1;
        }
    }
    return {
        orders: orders,
        previous: previous,
        currentPage: currentPage,
        next: next,
        pages: pages,
        filter: filter
    };
}


const findOrder = async (orderID) => {
    let orders = await Order.find({_id: orderID}).lean();
    if (!orders)
        return null;
    console.log(orders);
    return orders[0];

}



module.exports = {getCartPage, changename, changeemail, changeaddress, changephone, changeavatar, createOrder, getCart, findHistoryOrder, findOrderList,findOrder};
