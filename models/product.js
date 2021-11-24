const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productID: {
        type: "string",
        require: true
    },
    name: {
        type: "string",
        require: true
    },
    price: {
        type: "number",
        require: true
    },
    overview: {
        type: String,
        require: true
    },
    rate: {
        type: "integer",
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
        type: "array",
        items: {
            type: "string",
            default: "/images/p1.png"
        }
    },
    description: {
        type: "string",
        require: true
    },
    quantity: {
        type: "integer",
        require: true
    },
    category:{
        type: "string",
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema);