const service = require('../models/services/ProductService');

class ProductController{
    async getAllProduct(req,res){
        try{
            const [products, pages] = await service.add_list(req.query.pages || 1);
            res.render('product/product',{products, pages});
        }catch(err){
            console.log({message: err});
        }
    }
    async getProductDetail(req, res){
        try{
            const [productDetails, relatedProducts] = await service.add_detail(req.params.productID);
            res.render('product/productDetails', {productDetails, relatedProducts});
        }catch (err) {
            console.log({message: err});
        }
    }
}
module.exports = new ProductController; 