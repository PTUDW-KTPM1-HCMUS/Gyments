const service = require('./AuthService');
const passport = require('../../utils/passport');
const nodemailer = require('../../utils/email');

class AuthController {
    loginGuard(req, res, next){
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
    verifyAuthenticate(req, res, next){
        passport.authenticate('local',function(err,user){
            if(err){
                return next(err);
            }
            if(user.status==false){
                return res.redirect('/login?banned');
            }
            if(user.userType==true){
                return res.redirect('/login?secret');
            }
            if(!user)
            {
                return res.redirect('/login?invalid');
            }
            req.logIn(user, function(err){
                if(err)return next(err);
                return res.redirect('/');
            })
        })(req,res,next);
    }
    //[GET] login Page
    login(req,res){
        const wronguser = req.query['invalid'] !== undefined;
        const banneduser = req.query['banned']!== undefined;
        const adminuser =req.query['secret']!== undefined;
        res.render('auth/views/login',{wronguser, banneduser, adminuser});
    }
    //[GET] register Page
    registerPage(req,res){
        const wrongconfirm = req.query['wrong-confirm'] !== undefined;
        const username_existed = req.query['username_existed']!== undefined;
        // const phone_existed =req.query['phone_existed']!== undefined;
        const email_existed =req.query['email_existed']!== undefined;
        const short =req.query['short']!== undefined;
        res.render('auth/views/register',{short,wrongconfirm,username_existed,email_existed});
    }

    async register(req,res){
        const {email,username,password,confirmpass} = req.body;
        const check=await service.findOneAccount(username);
        if(check){
            res.redirect('/login/register?username_existed');
        }
        else{
            if(password.length<8)
            {
                res.redirect('/login/register?short');
            }
            else{
                const check_email = await service.findByEmail(email);
                // const check_phone = await service.findByPhone(phone);
                if(check_email){
                    res.redirect('/login/register?email_existed');
                }
                else{
                    if(confirmpass !== password){
                        res.redirect('/login/register?wrong-confirm');
                    }
                    else{
                        const user = await service.register(email,username,password,confirmpass);
                        const verify = await nodemailer.verify(req.headers.host,email);
                        
                        res.redirect('/login');
                        
                    }
                }
            }
        }
    }
    forgotPage(req,res){
        const wrongusername = req.query['wrong-user']!==undefined;
        const wrongemail =req.query['wrong-email']!==undefined;
        res.render('auth/views/forgot',{wrongusername,wrongemail});
    }


    async forgotPass(req,res){
        const {username,email}=req.body;
        const user = await service.findOneAccount(username);
        if(!user){
            res.redirect('/login/forgot?wrong-user');
        }
        else{
            const check_email =  await service.findByEmail(email);
            if(!check_email){
                res.redirect('/login/forgot?wrong-email');
            }
            else{
                const newpass= String("")+Math.floor(Math.random()*(99999999-10000000)+10000000);
                await service.changepass(user,newpass);
                await nodemailer.sendPass(newpass,email);
                res.redirect('/login');
            }
        }
    }
    async verifyAccount(req,res){
        const email = req.params.email;
        await service.activeAccount(email);
        res.redirect('/login');
    }
}

module.exports = new AuthController;