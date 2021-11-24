const express = require('express');
const router = express.Router();
const Order = require('../../models/order');



// get all orders from db
router.get('/', async (req, res) =>{
    try{
        const orders = await Order.find();
        res.json(orders);
    }catch (err){
        res.json({message: err});
    }
});

// post new order to db
router.post('/', async (req, res) => {
    const order = new Order({
        orderID: req.body.orderID,
        date: req.body.date,
        customerID: req.body.customerID,
        totalCost: req.body.totalCost,
        shipCost: req.body.shipCost,
        status: req.body.status,
        couponID: req.body.couponID
    });
    try{
        const savedOrder = await order.save();
        res.json(savedOrder);
    }catch(err){
        res.json({message: err});
    }
});

// get specific order by orderID
router.get('/:orderID',async(req, res) => {
    try{
        const order = await Order.find({"orderID": req.params.orderID});
        res.json(order);
    }catch (err){
        res.json({message: err});
    }
});
// delete an order by orderID
router.delete('/:orderID', async (req, res) => {
    try{
        const removedOrder = await Order.remove({"orderID": req.params.orderID});
        res.json(removedOrder);
    }catch(err){
        res.json({message: err});
    }
});

// update order information
router.patch('/:orderID', async (req, res) =>{
    try{
        const updatedOrder = await Order.updateOne(
            {"orderID": req.params.orderID},
            {
                $set: {
                    date: req.body.date,
                    customerID: req.body.customerID,
                    totalCost: req.body.totalCost,
                    shipCost: req.body.shipCost,
                    status: req.body.status,
                    couponID: req.body.couponID
                }
            }
        );
        res.json(updatedOrder);
    } catch (err){
        res.json({message: err});
    }
});


module.exports = router;