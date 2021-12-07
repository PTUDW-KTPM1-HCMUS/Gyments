const service = require('./LoginService');

class LoginController{
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
        const phone_existed =req.query['phone_existed']!== undefined;
        const email_existed =req.query['email_existed']!== undefined;
        const short =req.query['short']!== undefined;
        res.render('auth/views/register',{short,wrongconfirm,username_existed,phone_existed,email_existed});
    }

    async register(req,res){
        const {fname,lname,email,phone,gender,address,city,dis,zip,username,password,confirmpass} = req.body;
        const check=await service.findOneAccount(username);
        if(check){
            res.redirect('login/register?username_existed');
        }
        else{
            if(password.length<8)
            {
                res.redirect('login/register?short');
            }
            else{
                const check_email = await service.findByEmail(email);
                const check_phone = await service.findByPhone(phone);
                if(check_email){
                    res.redirect('login/register?email_existed');
                }
                else{
                    if(check_phone){
                        res.redirect('login/register?phone_existed');
                    }
                    else{
                        if(confirmpass !==password){
                            res.redirect('login/register?wrong-confirm');
                        }
                        else{
                            const user = await service.register(fname,lname,email,phone,gender,address,city,dis,zip,username,password);
                            res.redirect('/login');
                        }
                        
                    }
                    
                }      
            }
        }
    }
    
}

module.exports = new LoginController;