const express = require('express');
const router = express.Router();
const Customer = require('../../models/data/customer');



// get all customers from db
router.get('/', async (req, res) =>{
    try{
        const customers = await Customer.find();
        res.json(customers);
    }catch (err){
        res.json({message: err});
    }
});

// post new customer to db
router.post('/', async (req, res) => {
    const customer = new Customer({
        customerID: req.body.customerID,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        email: req.body.email
    });
    try{
        const savedCustomer = await customer.save();
        res.json(savedCustomer);
    }catch(err){
        res.json({message: err});
    }
});

// get specific customer by customerID
router.get('/:customerID',async(req, res) => {
    try{
        const customer = await Customer.find({"customerID": req.params.customerID});
        res.json(customer);
    }catch (err){
        res.json({message: err});
    }
});
// delete an customer by customerID
router.delete('/:customerID', async (req, res) => {
    try{
        const removedCustomer = await Customer.remove({"customerID": req.params.customerID});
        res.json(removedCustomer);
    }catch(err){
        res.json({message: err});
    }
});

// update customer information
router.patch('/:customerID', async (req, res) =>{
    try{
        const updatedCustomer = await Customer.updateOne(
            {"customerID": req.params.customerID},
            {
                $set: {
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    gender: req.body.gender,
                    email: req.body.email
                }
            }
        );
        res.json(updatedCustomer);
    } catch (err){
        res.json({message: err});
    }
});


module.exports = router;