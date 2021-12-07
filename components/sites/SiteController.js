const service = require('./SiteService');

class SiteController{
    //[GET] Home Page
    async homePage (req, res){
        try{
            const [products] = await service.getSpecificProduct(6);
            res.render('sites/views/index',{products});
        }catch(err){
            console.log({message: err});
        }
    }

    //[GET] About Page
    about(req,res){
        res.render('sites/views/about');
    }

    //[GET] testimonial
    testimonial(req,res){
        res.render('sites/views/testimonial');
    }

    //[GET] whyUs
    why(req,res){
        res.render('sites/views/whyUs');
    }
    
}

module.exports = new SiteController;