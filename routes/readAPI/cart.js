const express = require('express');
const router = express.Router();
const Cart = require('../../models/data/cart');



// get all carts from db
router.get('/', async (req, res) =>{
    try{
        const carts = await Cart.find();
        res.json(carts);
    }catch (err){
        res.json({message: err});
    }
});

// post new cart to db
router.post('/', async (req, res) => {
    const cart = new Cart({
        cartID: req.body.cartID,
        customerID: req.body.customerID,
        products: req.body.products,
        totalPrice: req.body.totalPrice
    });
    try{
        const savedCart = await cart.save();
        res.json(savedCart);
    }catch(err){
        res.json({message: err});
    }
});

// get specific cart by cartID
router.get('/:cartID',async(req, res) => {
    try{
        const cart = await Cart.find({"cartID": req.params.cartID});
        res.json(cart);
    }catch (err){
        res.json({message: err});
    }
});
// delete an cart by cartID
router.delete('/:cartID', async (req, res) => {
    try{
        const removedCart = await Cart.remove({"cartID": req.params.cartID});
        res.json(removedCart);
    }catch(err){
        res.json({message: err});
    }
});

// update cart information
router.patch('/:cartID', async (req, res) =>{
    try{
        const updatedCart = await Cart.updateOne(
            {"cartID": req.params.cartID},
            {
                $set: {
                    "products": req.body.products,
                    "totalPrice": req.body.totalPrice
                }
            }
        );
        res.json(updatedCart);
    } catch (err){
        res.json({message: err});
    }
});


module.exports = router;