const service = require('../models/services/ProductService');

class ProductController{
    async getall(req,res){
        try{
            const [products,pages] = await service.add_list(req.query.pages||1);

            res.render('products',{products,pages});

        }catch(err){
            console.log(err);
        }
    }

}
module.exports = new ProductController; 