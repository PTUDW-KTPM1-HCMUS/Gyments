const express = require('express');
const router = express.Router();
const Account = require('../../models/account');

// router.get('/', function(req, res, next) {
//
// });
router.get('/', async (req, res) =>{
   try{
       const accounts = await Account.find();
       res.json(accounts);
   }catch (err){
       res.json({message: err});
   }
});

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
module.exports = router;
