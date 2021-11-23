const express = require('express');
const router = express.Router();
const Account = require('../models/account');
/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('account/login');
});


router.post('/', async (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password
    });
    try{
        const savedAccount = await account.save();
        res.json(savedAccount);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;
