const express = require('express');
const router = express.Router();
const Review = require('../../models/review');



// get all review from db
router.get('/', async (req, res) =>{
    try{
        const reviews = await Review.find();
        res.json(reviews);
    }catch (err){
        res.json({message: err});
    }
});

// post new review to db
router.post('/', async (req, res) => {
    const review = new Review({
        reviewID: req.body.reviewID,
        customerID: req.body.customerID,
        productID: req.body.productID,
        summary: req.body.summary,
        reviewDetail: req.body.reviewDetail,
        status: req.body.status,
        rate: req.body.rate
    });
    try{
        const savedReview = await review.save();
        res.json(savedReview);
    }catch(err){
        res.json({message: err});
    }
});

// get specific review by reviewID
router.get('/:reviewID',async(req, res) => {
    try{
        const review = await Review.find({"reviewID": req.params.reviewID});
        res.json(review);
    }catch (err){
        res.json({message: err});
    }
});
// delete an review by reviewID
router.delete('/:reviewID', async (req, res) => {
    try{
        const removedReview = await Review.remove({"reviewID": req.params.reviewID});
        res.json(removedReview);
    }catch(err){
        res.json({message: err});
    }
});

// update review information
router.patch('/:reviewID', async (req, res) =>{
    try{
        const updatedReview = await Review.updateOne(
            {"reviewID": req.params.reviewID},
            {$set: {"customerID": req.body.customerID},
                $set: {"productID": req.body.productID},
                $set: {"summary": req.body.summary},
                $set: {"reviewDetail": req.body.reviewDetail},
                $set: {"status": req.body.status},
                $set: {"rate": req.body.rate},}
        );
        res.json(updatedReview);
    } catch (err){
        res.json({message: err});
    }
});


module.exports = router;