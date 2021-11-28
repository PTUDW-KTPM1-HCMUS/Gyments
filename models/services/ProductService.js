const Product = require('../data/product');

const add_list = async(reqPage)=>{
    let products = [];
    let pages = [];

    try{
        products = await Product.find().lean();
        const perPage = 6; 
        const page = parseInt(reqPage);

        const pro_start = (page - 1) * perPage;
        const pro_end = page * perPage;

        for (let i = 0; i < products.length/perPage; i++){
            let tmp = {};
            tmp.page = i + 1;
            tmp.pageA = `?page=${i+1}`;
            pages.push(tmp);
        }
        products = products.slice(pro_start,pro_end);

        products = products.map(item => {
            let productID = "/product/" + item.productID;
            return { ...item, productID: productID }
        });

        return [products, pages];
    }catch(err){
        console.log({message: err});
    }
    return [products, pages]
}

const add_detail = async (productID) =>{
    let productDetails = null;
    let relatedProducts = [];
    try{
        productDetails = await Product.findOne({productID: productID}).lean();
        relatedProducts = await Product.find({categoryID: productDetails.categoryID}).lean();

        relatedProducts = relatedProducts.map(item => {
            let productID = "/product/" + item.productID;
            return { ...item, productID: productID }
        });

        return [productDetails, relatedProducts];
    }catch (err){
        console.log({message: err});
    }
    return [productDetails, relatedProducts];
}
module.exports = {add_list , add_detail};