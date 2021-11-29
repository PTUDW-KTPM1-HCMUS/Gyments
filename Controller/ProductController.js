const service = require('../models/services/ProductService');

class ProductController{
    async getAllProduct(req,res){
        try{
            let currentPage = req.query.page || 1;
            const [products, pages] = await service.add_list(currentPage);
            res.render('product/product',{products, pages, currentPage});
        }catch(err){
            console.log({message: err});
        }
    }
    async getProductDetail(req, res){
        try{
            const [productDetails, relatedProducts] = await service.add_detail(req.params.productID);
            res.render('product/productDetail', {productDetails, relatedProducts});
        }catch (err) {
            console.log({message: err});
        }
    }
}
module.exports = new ProductController; 