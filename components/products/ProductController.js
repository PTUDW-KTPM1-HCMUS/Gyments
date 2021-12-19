const service = require('./ProductService');
const categoryService = require("../categories/categoryService");
class ProductController{

    async getAllProduct(req, res){
        try{
            let currentPage = req.query.page || 1;
            let categoryID = req.query.category || "all";
            let price = req.query.price || "all";
            let [products, pages] = [null, null];
            let min = 0; // min price range
            let max = 4000; // max price range
            let categoryDetail = false;
            if (price !== "all"){
                [min, max] = service.getPriceRange(price);
            }
            if (categoryID === "all"){
                [products, pages] = await service.getAllProduct(currentPage, categoryID, min, max);
            }else if (categoryID !== "all"){
                [products, pages] = await service.getByCategoryID(categoryID, currentPage, min, max);
                categoryDetail = await categoryService.getCategoryByID(categoryID);
            }
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            res.render('products/views/product',{products, pages, currentPage,previous,next, categoryDetail});

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
    async search(req, res){
        try{
            const description = req.query.description;
            let currentPage = req.query.page || 1;
            const [products, pages] = await service.searchByDescription(description, currentPage);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            let found = true;
            if (products.length === 0)
                found = false;
            res.render('products/views/searchPage', {products, pages, description, found, currentPage, next, previous});
        }catch (err){
            console.log({message: err});
        }
    }
}
module.exports = new ProductController; 