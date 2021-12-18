
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
}

module.exports = new ApiController;