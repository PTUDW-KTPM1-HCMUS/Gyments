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

exports.register = async (name, email,username,password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashpass = await bcrypt.hashSync(password,salt);
    // const full_addr = address+String(" ")+dis+String(" ")+city;
    // let avatar = null;
    // let avatarID= null;
    // let imgResult = await cloudinary.uploader.upload(avatarDetail.path);
    // avatar = imgResult.secure_url;
    // avatarID = imgResult.public_id;
    const user = await User.create({
        name: name,
        email:email,
        username: username,
        password: hashpass,
    });
    // create empty cart
    await Cart.create({
        customerID: user._id
    });
}

exports.changepass = async(user,password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashpass = await bcrypt.hashSync(password,salt);
    return User.findOneAndUpdate({username:user.username},{password:hashpass});
}

