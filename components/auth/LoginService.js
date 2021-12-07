const { exists } = require('./AccountModel');
const User = require('./AccountModel');
const bcrypt = require('bcrypt');



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
exports.LoginGuard=(req, res, next)=>{
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
exports.register = async (fname,lname,email,phone,gender,address,city,dis,zip,username,password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashpass = await bcrypt.hashSync(password,salt);
    const full_addr = address+String(" ")+dis+String(" ")+city;
    return User.create({
        fname:fname,
        lname:lname,    
        email:email,
        phone:phone,
        gender:gender,
        address: full_addr,
        username: username,
        password: hashpass,
    });
}