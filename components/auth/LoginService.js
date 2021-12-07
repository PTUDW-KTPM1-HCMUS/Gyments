const User = require('./AccountModel');
//const bycrypt = require('bcrypt');


exports.findOneAccount = (username)=>{
    return  User.findOne({username:username}).lean();
}

exports.validPassword =(password,user)=>{
    // return bcrypt.compare(password,user.password);
    return password===user.password;
}
exports.LoginGuard=(req, res, next)=>{
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
