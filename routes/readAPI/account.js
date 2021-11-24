const express = require('express');
const router = express.Router();
const Account = require('../../models/account');

// get all accounts from db
router.get('/', async (req, res) =>{
   try{
       const accounts = await Account.find();
       res.json(accounts);
   }catch (err){
       res.json({message: err});
   }
});

// post new account to db
router.post('/', async (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
        userType: req.body.userType
    });
    try{
        const savedAccount = await account.save();
        res.json(savedAccount);
    }catch(err){
        res.json({message: err});
    }
});

// get specific account by username
router.get('/:username',async(req, res) => {
   try{
       const account = await Account.find({"username": req.params.username});
       res.json(account);
   }catch (err){
       res.json({message: err});
   }
});
// delete an account by username
router.delete('/:username', async (req, res) => {
   try{
       const removedAccount = await Account.remove({"username": req.params.username});
       res.json(removedAccount);
   }catch{
       res.json({message: err});
   }
});

// update account information like password
router.patch('/:username', async (req, res) =>{
   try{
       const updatedAccount = await Account.updateOne(
           {"username": req.params.username},
           {$set: {"password": req.body.password}}
       );
       res.json(updatedAccount);
   } catch (err){
       res.json({message: err});
   }
});

module.exports = router;
