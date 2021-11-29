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
            let newPrice = productDetails.price - productDetails.price * productDetails.sale / 100;
            res.render('product/productDetail', {productDetails, relatedProducts, newPrice});
        }catch (err) {
            console.log({message: err});
        }
    }
}
module.exports = new ProductController; 