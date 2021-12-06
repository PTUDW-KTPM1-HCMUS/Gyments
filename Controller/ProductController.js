const service = require('../Models/services/ProductService');

class ProductController{
    async getAllProduct(req, res){
        try{
            let currentPage = req.query.page || 1;
            const [products, pages] = await service.getAllProduct(currentPage);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            res.render('product/product',{products, pages, currentPage,previous,next});
        }catch(err){
            console.log({message: err});
        }
    }
    async getProductDetail(req, res){
        try{
            const [productDetails, relatedProducts] = await service.getProduct(req.params.productID);
            let newPrice = productDetails.price - productDetails.price * productDetails.sale / 100;
            res.render('product/productDetail', {productDetails, relatedProducts, newPrice});
        }catch (err) {
            console.log({message: err});
        }
    }
}
module.exports = new ProductController; 