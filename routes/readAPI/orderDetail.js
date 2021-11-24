const express = require('express');
const router = express.Router();
const OrderDetail = require('../../models/orderDetail');

// get all orders detail from db
router.get('/', async (req, res) =>{
    try{
        const orderDetails = await OrderDetail.find();
        res.json(orderDetails);
    }catch (err){
        res.json({message: err});
    }
});

// post new order details to db
router.post('/', async (req, res) => {
    const orderDetail = new OrderDetail({
        orderDetailID: req.body.orderDetailID,
        orderID: req.body.orderID,
        products: req.body.products
    });
    try{
        const savedOrderDetail = await orderDetail.save();
        res.json(savedOrderDetail);
    }catch(err){
        res.json({message: err});
    }
});

// get specific order detail by orderDetailID
router.get('/:orderDetailID',async(req, res) => {
    try{
        const orderDetail = await OrderDetail.find({"orderDetailID": req.params.orderDetailID});
        res.json(orderDetail);
    }catch (err){
        res.json({message: err});
    }
});
// delete an order detail by orderDetailID
router.delete('/:orderDetailID', async (req, res) => {
    try{
        const removedOrderDetail = await OrderDetail.remove({"orderDetailID": req.params.orderDetailID});
        res.json(removedOrderDetail);
    }catch(err){
        res.json({message: err});
    }
});

// update order information
router.patch('/:orderDetailID', async (req, res) =>{
    try{
        const updatedOrderDetail = await OrderDetail.updateOne(
            {"orderDetailID": req.params.orderDetailID},
            {
                $set: {
                    orderID: req.body.orderID,
                    products: req.body.products
                }
            }
        );
        res.json(updatedOrderDetail);
    } catch (err){
        res.json({message: err});
    }
});

module.exports = router;