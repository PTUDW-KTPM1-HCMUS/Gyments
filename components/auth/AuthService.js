const { exists } = require('./AccountModel');
const User = require('./AccountModel');
const bcrypt = require('bcrypt');
const cloudinary = require('../../utils/cloudinary');
const Cart = require('../users/model/cart');

exports.findOneAccount = (username)=>{
    return  User.findOne({username:username}).lean();
}

exports.findByEmail = (email)=>{
    return  User.findOne({email:email}).lean();
}
exports.findByPhone = (phone)=>{
    return  User.findOne({phone:phone}).lean();
}

exports.validPassword = (password,user)=>{
    return bcrypt.compareSync(password,user.password);
}

exports.register = async (email,username,password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashpass = await bcrypt.hashSync(password,salt);
    const user = await User.create({
        email:email,
        username: username,
        password: hashpass,
    });
    // create empty cart
    await Cart.create({
        customer: user.username
    });
}

exports.changepass = async(user,password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashpass = await bcrypt.hashSync(password,salt);
    return User.findOneAndUpdate({username:user.username},{password:hashpass});
}

exports.activeAccount =async(email_)=>{
    return user= await User.findOneAndUpdate({email:email_},{status:1});
}
