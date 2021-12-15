const service = require('./ProductService');
const categoryService = require("../categories/categoryService");
class ProductController{
    async getAllProduct(req, res){
        try{
            let currentPage = req.query.page || 1;
            const [products, pages] = await service.getAllProduct(currentPage);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            let categories = await categoryService.getAllCategories();
            res.render('products/views/product',{products, pages, currentPage,previous,next, categories});

        }catch(err){
            console.log({message: err});
        }
    }
    async getProductDetail(req, res){
        try{
            const [productDetails, relatedProducts] = await service.getProduct(req.params.productID);
            let newPrice = productDetails.price - productDetails.price * productDetails.sale / 100;
            res.render('products/views/productDetail', {productDetails, relatedProducts, newPrice});
        }catch (err) {
            console.log({message: err});
        }
    }
    async getAllByCategory(req,res){
        try{
            const categoryID = await categoryService.getCategoryIDByID(req.params.ID);
            if (!categoryID){
                let categories = await categoryService.getAllCategories();
                res.render('products/views/product',{categories});
            }
            let currentPage = req.query.page || 1;
            const [products, pages] = await service.getByCategoryID(categoryID, currentPage);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            let categories = await categoryService.getAllCategories();
            res.render('products/views/product',{products, pages, currentPage,previous,next, categories});

        }catch(err){
            console.log({message: err});
        }
    }
}
module.exports = new ProductController; 