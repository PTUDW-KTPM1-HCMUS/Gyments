const { localsAsTemplateData } = require('hbs');
const ProductController = require('../../Controller/ProductController');
const product = require('../data/product');
const Product = require ('../data/product');

const add_list = async(reqPage)=>{
    let products=[];
    let pages=[];

    try{
        products = await Product.find();
        const perPage = 6; 
        const page = parseInt(reqPage);

        const pro_start = (page-1) * perPage;
        const pro_end = page * perPage;

        for ( let i = 0; i<products.length/perPage;i++){
            let tmp ={};
            tmp.page = i+1;
            tmp.pageA = `?page=${i+1}`;
            pages.push(tmp);
        }

        products = products.slice(pro_start,pro_end);
        return [products,pages];
    }catch(err){
        console.log(err);
    }
    console.log("ALo")
    return [products,pages]
}

const add_detail= async(reqID)=>{
    let detail =null;
    let relate = null;
    return [detail,relate];
}
module.exports = {add_list , add_detail};