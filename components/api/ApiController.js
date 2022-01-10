
const service = require('../products/ProductService');
const userservice = require('../users/UserService');
const apiservice = require('./ApiService');

class ApiController{
    async get_product(req,res){
        try{
            const [productDetails, relatedProducts] = await service.getProduct(req.params.productID);
            res.json(productDetails);
        }catch (err) {
            console.log({message: err});
        }
    } 
    async get_all(req,res){
        try{
            const cart = await userservice.getCart(req.user.username);
            res.json(cart);
        }catch (err) {
            console.log({message: err});
        }
    } 
    async post_product(req,res){

        const quantity = req.query.quantity;
        const username = req.user.username;
        const productID = req.params.productID;
        const error = await apiservice.uploadCart(username,productID,quantity);
        res.send({error});
    }
    async postComment(req, res){
        const productID = req.params.productID;
        let userID = "";
        let nickname = req.body.nickname;
        let content = req.body.content;
        let avatar = "https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg";
        if(req.user){
            userID = req.user._id;
            nickname = req.user.name;
            avatar = req.user.avatar;
        }
        const comment = await apiservice.postComment(nickname, productID, userID, content, avatar);
        res.status(201).json(comment);
    }
    async delete_product(req,res){
        const username = req.user.username;
        const productID = req.params.productID;
        const error= await apiservice.deleteFromCart(username,productID);
        res.send({error});
    }
    async updateQuantity(req,res){
        const quantity = req.query.quantity;
        
        const username = req.user.username;
        const productID = req.params.productID;
        const error = await apiservice.fixQuantity(username,productID,quantity);
        
        res.send({error});
    }
}

module.exports = new ApiController;