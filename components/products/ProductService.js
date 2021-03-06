const Product = require('./model/ProductModel');
const Comment = require("../users/model/review");



// get all products in database
const getAllProduct = async(reqPage, categoryID, min, max) => {
    let products = [];
    let pages = [];
    try{
        products = await Product.find({price: { $lte: max, $gte: min }}).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const pro_start = (page - 1) * perPage;
        const pro_end = page * perPage;

        for (let i = 0; i < products.length / perPage; i++){
            let tmp = {};
            tmp.categoryID = categoryID;
            tmp.currentPage = i + 1;
            tmp.pageLink = `&page=${i+1}`;
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
const getByCategoryID = async (categoryID, reqPage, min, max)=>{
    let products = [];
    let pages = [];
    try{
        products = await Product.find({'categoryID': categoryID, price: { $lte: max, $gte: min }}).lean();
        const perPage = 6;
        const page = parseInt(reqPage);

        const pro_start = (page - 1) * perPage;
        const pro_end = page * perPage;

        for (let i = 0; i < products.length / perPage; i++){
            let tmp = {};
            tmp.categoryID = categoryID;
            tmp.currentPage = i + 1;
            tmp.pageLink = `&page=${i+1}`;
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
    return [products, pages];
}
const getPriceRange = (priceRange) => {
    priceRange = priceRange.split("-");
    for (let i =0; i < priceRange.length; i++){
        priceRange[i] = priceRange[i].trim();
    }
    let min = priceRange[0].substring(1, priceRange[0].length);
    let max = priceRange[1].substring(1, priceRange[1].length);
    return [min, max];
}
const searchByDescription = async (description, reqPage) => {
    let products = [];
    let pages = [];
    try{
        products = await Product.find({name: {"$regex": description, "$options": "i" }}).lean();
        const perPage = 3;
        const page = parseInt(reqPage);

        const pro_start = (page - 1) * perPage;
        const pro_end = page * perPage;

        for (let i = 0; i < products.length / perPage; i++){
            let tmp = {};
            tmp.description = description;
            tmp.currentPage = i + 1;
            tmp.pageLink = `&page=${i+1}`;
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
    return [products, pages];
}
const getComment = async (productID,page,size) =>{
    var comments = [];
    comments = await Comment.find({productID: productID}).lean();

    let older = null;
    let newer = null;
    let totalPage = parseInt(comments.length/size)  + 1;
    let pages = [];
    let currentPage = page;
    if ( page > totalPage){
        currentPage = totalPage;
    }

    for (let i = currentPage - 2;i<=totalPage   ;i++){
        if ( i > 0){
            pages.push({
                number: i,
                productID: productID
            })
        }
    }
    if (currentPage>1){
        newer = currentPage -1;
    }
    if (currentPage<totalPage){
        older = currentPage + 1;
    }
    comments = comments.slice((currentPage-1)*size,currentPage*size );
    return {
        comments: comments,
        newer: newer,
        currentPage: currentPage,
        older: older,
        pages: pages
    };

}
const postComment = async (nickname, productID, userID, content, avatar) => {
    const comment = await Comment.create({
        userID: userID,
        userAvatar: avatar,
        nickname: nickname,
        productID: productID,
        content: content
    });
}
module.exports = {getAllProduct , getProduct, getByCategoryID, getPriceRange, searchByDescription, postComment, getComment};