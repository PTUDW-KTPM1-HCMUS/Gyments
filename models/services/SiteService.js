const Product = require('../data/product');

// get first numberOfProduct from database
// example: numberOfProduct = 6 => get 0, 1, 2, 3, 4, 5 products from database
const getSpecificProduct = async(numberOfProduct) => {
    let products = [];
    try{
        products = await Product.find().lean();

        products = products.slice(0, numberOfProduct);

        products = products.map(item => {
            let name = item.name;
            let rate = new Array(item.rate).fill(0);
            if (item.name.length >= 30)
                name = item.name.slice(0, 28) + "...";
            let productID = "/product/" + item.productID;
            return { ...item, name: name, productID: productID, rate: rate }
        });
        return [products];
    }catch(err){
        console.log({message: err});
    }
    return [products]
}
module.exports = {getSpecificProduct};