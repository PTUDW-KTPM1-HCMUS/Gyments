const Product = require('./model/ProductModel');
// get all products in database
const getAllProduct = async(reqPage) => {
    let products = [];
    let pages = [];
    try{
        products = await Product.find().lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const pro_start = (page - 1) * perPage;
        const pro_end = page * perPage;

        for (let i = 0; i < products.length / perPage; i++){
            let tmp = {};
            tmp.currentPage = i + 1;
            tmp.pageLink = `?page=${i+1}`;
            pages.push(tmp);
        }
        products = products.slice(pro_start, pro_end);

        products = products.map(item => {
            let name = item.name;
            let rate = new Array(item.rate).fill(0);
            if (item.name.length >= 30)
                name = item.name.slice(0, 28) + "...";
            let productID = "/product/" + item._id;
            return { ...item, name: name, productID: productID, rate: rate }
        });

        return [products, pages];
    }catch(err){
        console.log({message: err});
    }
    return [products, pages]
}
// get all information of product by id
const getProduct = async (productID) => {
    let productDetails = null;
    let relatedProducts = [];
    try{
        productDetails = await Product.findById(productID).lean();
        // let indexOfProduct = parseInt(productID.slice(-2));
        // we use $ne (not equal) here to skip the current product from related product
        relatedProducts = await Product.find({categoryID: productDetails.categoryID, _id: { $ne: productID}}).lean();

        productDetails.rate = new Array(productDetails.rate).fill(0);
        // split the description to array
        const words = productDetails.description.split('.');
        // remove the last element because it's just space
        if (words[words.length - 1] === ""){
            words.splice(-1);
        }
        productDetails.description = words;
        relatedProducts = relatedProducts.map(item => {
            let productID = "/product/" + item._id;
            return { ...item, productID: productID }
        });

        return [productDetails, relatedProducts];
    }catch (err){
        console.log({message: err});
    }
    return [productDetails, relatedProducts];
}
module.exports = {getAllProduct , getProduct};