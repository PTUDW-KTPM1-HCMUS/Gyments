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

const getCategoryByID = async (ID) =>{
    try{
        let category = await Category.findById(ID).lean();
        if (category)
            return category;
        else
            return null;
    }catch (err){
        console.log(err);
        return null;
    }
}
module.exports = {getAllCategories, getCategoryByID};