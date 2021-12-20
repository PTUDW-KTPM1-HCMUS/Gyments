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
            const [product, relatedProducts] = await service.getProduct(req.params.productID);
            let newPrice = product.price - product.price * product.sale / 100;
            const comments = await service.getComment(req.params.productID);
            res.render('products/views/productDetail', {product, relatedProducts, newPrice, comments});
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
    async postComment(req, res){
        const productID = req.params.productID;
        let userID = "";
        let nickname = "";
        let avatar = "https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg";
        const content = req.body.content;
        if(req.user){
            userID = req.user._id;
            nickname = req.user.name;
            avatar = req.user.avatar;
        }else{
            nickname = req.body.nickname;
        }
        const comment = await service.postComment(nickname, productID, userID, content, avatar);
        res.redirect(`/product/${productID}`);
    }
}
module.exports = new ProductController; 