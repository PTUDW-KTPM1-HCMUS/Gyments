const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: "string",
        require: true
    },
    price: {
        type: "number",
        require: true
    },
    overview: {
        type: "string",
        require: true
    },
    rate: {
        type: "number",
        default: 5
    },
    sale: {
        type: "number",
        default: 0
    },
    description: {
        type: "string",
        require: true
    },
    images: {
        type: "Array"
    },
    imagesID:{
        type: "Array"
    },
    quantity: {
        type: "number",
        require: true
    },
    categoryID:{
        type: "string",
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema);