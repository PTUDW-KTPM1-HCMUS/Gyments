const service = require('../Models/services/SiteService');

class SiteController{
    //[GET] Home Page
    async homePage (req, res){
        try{
            const [products] = await service.getSpecificProduct(6);
            console.log(req.user);
            res.render('site/index',{products});
        }catch(err){
            console.log({message: err});
        }
    }

    //[GET] About Page
    about(req,res){
        res.render('site/about');
    }

    //[GET] testimonial
    testimonial(req,res){
        res.render('site/testimonial');
    }

    //[GET] whyUs
    why(req,res){
        res.render('site/whyUs');
    }
    
}

module.exports = new SiteController;