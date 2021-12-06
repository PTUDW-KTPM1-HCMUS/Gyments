const service = require('../Models/services/LoginService');

class LoginController{
    //[GET] login Page
    login(req,res){
        const wronguser = req.query['invalid']!==undefined;
        const banneduser = req.query['banned']!==undefined;
        const adminuser =req.query['secret']!==undefined;
        res.render('authen/login',{wronguser,banneduser,adminuser});
    }
    //[GET] register Page
    registerPage(req,res){
        res.render('authen/register');
    }
    
}

module.exports = new LoginController;