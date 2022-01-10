const Cart = require('../users/model/cart');
const Product = require('../products/model/ProductModel')
const Comment = require("../users/model/review");

const uploadCart = async(username,productID,quantity)=>{
    try{
        let tmp = []
        let userCart = await Cart.findOne({customer: username}).lean();
        let temp = await Product.findOne({_id:productID}).lean();

        temp.inCart = parseInt(quantity);
        temp.price = Math.ceil(temp.price-temp.price*temp.sale/100);  
        temp.totalPrice = Math.ceil(temp.inCart*temp.price);
        tmp.push(JSON.stringify(temp));

        if(!userCart){
            await Cart.create({
                customer: username,
                products: temp,
                totalPrice: temp.totalPrice,
            });
        }
        else if(userCart){

            const key = Object.keys(userCart.products);
            let check = false;
            key.forEach((key,index)=>{

                if(String(userCart.products[key]._id)==String(temp._id)){
                    userCart.products[key].inCart+=temp.inCart;
                    userCart.products[key].totalPrice += temp.totalPrice;
                    check = true;
                }
            });

            if(check ==false ){
                updateCart = await Cart.findOneAndUpdate({customer:username},{
                    $push: {
                        products:temp,
                    }
                });
               
            }
            else{
                updateCart = await Cart.findOneAndUpdate({customer:username},{
                    products: userCart.products,
                });
                
            }  
        }
        return 0;
        
    }catch(err){
        console.log(err);
        return 1;
    }
}
const postComment = async (nickname, productID, userID, content, avatar) => {
    const comment = await Comment.create({
        userID: userID,
        userAvatar: avatar,
        nickname: nickname,
        productID: productID,
        content: content
    });
    return comment;
}
const deleteFromCart = async ( username,productID)=>{
    try{
        updateCart = await Cart.findOne({customer:username});
        for (let i = 0; i < updateCart.products.length; i++) {
            if (updateCart.products[i]._id == productID) {
                updateCart.totalPrice -= parseInt(updateCart.products[i].totalPrice);
                updateCart.products.splice(i, 1);
            }
        }
        await updateCart.save();
        
        return 0;
    }catch(err){
        console.log(err);
        return 1;
    }
}

const fixQuantity = async(username,productID,quantity)=>{
    try{
        
        let cart = await Cart.findOne({customer:username});
        const products =[]
        let value =0;
        let cost =0;
        for(let i = 0 ;i<cart.products.length;i++){
            
            if(String(cart.products[i]._id)==String(productID)){
                cart.products[i].inCart = parseInt(quantity);
                cart.products[i].totalPrice = parseInt(Math.ceil(cart.products[i].price*quantity));
                value = cart.products[i].totalPrice;
                products.push(cart.products[i]);
                console.log(cart.products[i].totalPrice);
            }
            cost +=cart.products[i].totalPrice;
            console.log(cart.products[i].totalPrice);
        }
        cart.totalPrice = cost;
        await cart.save();
        await Cart.findOneAndUpdate({customer:username},{products:cart.products});
        return value;
    }catch(error){
        console.log(error);
        return 0;
    }
}
module.exports = {uploadCart, postComment,deleteFromCart,fixQuantity};