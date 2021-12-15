const Category = require("./categoryModel");

const getAllCategories = async () =>{
    try{
        let categories = Category.find().lean();
        return categories;
    }catch (err){
        console.log(err);
        return null;
    }

}
const getCategoryIDByID = async (ID) =>{
    try{
        let category = await Category.findOne({'_id': ID});
        if (category)
            return category.categoryID;
        else
            return null;
    }catch (err){
        console.log(err);
        return null;
    }
}


module.exports = {getAllCategories,getCategoryIDByID};