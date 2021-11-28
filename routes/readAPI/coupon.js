const express = require('express');
const router = express.Router();
const Coupon = require('../../models/data/coupon');



// get all coupons from db
router.get('/', async (req, res) =>{
    try{
        const coupons = await Coupon.find();
        res.json(coupons);
    }catch (err){
        res.json({message: err});
    }
});

// post new coupon to db
router.post('/', async (req, res) => {
    const coupon = new Coupon({
        couponID: req.body.couponID,
        discountPercent: req.body.discountPercent,
        status: req.body.status,
        expirationTime: req.body.expirationTime
    });
    try{
        const savedCoupon = await coupon.save();
        res.json(savedCoupon);
    }catch(err){
        res.json({message: err});
    }
});

// get specific coupon by couponID
router.get('/:couponID',async(req, res) => {
    try{
        const coupon = await Coupon.find({"couponID": req.params.couponID});
        res.json(coupon);
    }catch (err){
        res.json({message: err});
    }
});
// delete an coupon by couponID
router.delete('/:couponID', async (req, res) => {
    try{
        const removedCoupon = await Coupon.remove({"couponID": req.params.couponID});
        res.json(removedCoupon);
    }catch(err){
        res.json({message: err});
    }
});

// update coupon information
router.patch('/:couponID', async (req, res) =>{
    try{
        const updatedCoupon = await Coupon.updateOne(
            {"couponID": req.params.couponID},
            {
                $set: {
                    discountPercent: req.body.discountPercent,
                    status: req.body.status,
                    expirationTime: req.body.expirationTime
                }
            }
        );
        res.json(updatedCoupon);
    } catch (err){
        res.json({message: err});
    }
});


module.exports = router;