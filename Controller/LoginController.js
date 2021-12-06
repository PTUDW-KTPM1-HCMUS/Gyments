const service = require('../Models/services/LoginService');

class LoginController{
    //[GET] login Page
    login(req,res){
        const wronguser = req.query['invalid']!==undefined;
        console.log(wronguser);
        const banneduser = req.query['banned']!==undefined;
        res.render('authen/login',{wronguser,banneduser});
    }
    //[GET] register Page
    registerPage(req,res){
        res.render('authen/register');
    }
    
}

module.exports = new LoginController;