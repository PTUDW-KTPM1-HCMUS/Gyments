const express = require('express');
const router = express.Router();
const Category = require('../../models/data/category');



// get all category from db
router.get('/', async (req, res) =>{
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch (err){
        res.json({message: err});
    }
});

// post new category to db
router.post('/', async (req, res) => {
    const category = new Category({
        categoryID: req.body.categoryID,
        name: req.body.name
    });
    try{
        const savedCategory = await category.save();
        res.json(savedCategory);
    }catch(err){
        res.json({message: err});
    }
});

// get specific category by categoryID
router.get('/:categoryID',async(req, res) => {
    try{
        const category = await Category.find({"categoryID": req.params.categoryID});
        res.json(category);
    }catch (err){
        res.json({message: err});
    }
});
// delete an  category by categoryID
router.delete('/:categoryID', async (req, res) => {
    try{
        const removedCategory = await Category.remove({"categoryID": req.params.categoryID});
        res.json(removedCategory);
    }catch(err){
        res.json({message: err});
    }
});

// update category information
router.patch('/:categoryID', async (req, res) =>{
    try{
        const updatedCategory = await Category.updateOne(
            {"categoryID": req.params.categoryID},
            {
                $set: {
                    name: req.body.name
                }
            }
        );
        res.json(updatedCategory);
    } catch (err){
        res.json({message: err});
    }
});


module.exports = router;