const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

// get all products from db
router.get('/', async (req, res) =>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch (err){
        res.json({message: err});
    }
});

// post new product to db
router.post('/', async (req, res) => {
    const product = new Product({
        productID: req.body.productID,
        name: req.body.name,
        price: req.body.price,
        overview: req.body.overview,
        rate: req.body.rate,
        sale: req.body.sale,
        description: req.body.description,
        images: req.body.images,
        quantity: req.body.quantity,
        category: req.body.category
    });
    try{
        const savedProduct = await product.save();
        res.json(savedProduct);
    }catch(err){
        res.json({message: err});
    }
});

// get specific product by productID
router.get('/:productID',async(req, res) => {
    try{
        const product = await Product.find({"productID": req.params.productID});
        res.json(product);
    }catch (err){
        res.json({message: err});
    }
});
// delete an product by productID
router.delete('/:productID', async (req, res) => {
    try{
        const removedProduct = await Product.remove({"productID": req.params.productID});
        res.json(removedProduct);
    }catch (err) {
        res.json({message: err});
    }
});

// update product information
router.patch('/:productID', async (req, res) =>{
    try{
        const updatedProduct = await Product.updateOne(
            {"productID": req.params.productID},
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    overview: req.body.overview,
                    rate: req.body.rate,
                    sale: req.body.sale,
                    description: req.body.description,
                    images: req.body.images,
                    quantity: req.body.quantity,
                    category: req.body.category
                }
            }
        );
        res.json(updatedProduct);
    } catch (err){
        res.json({message: err});
    }
});

module.exports = router;
