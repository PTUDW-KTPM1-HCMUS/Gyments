const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cartID: {
        type: "string",
        require: true
    },
    customerID: {
        type: "string",
        default: null
    },
    products: { // list of products
        type: "array",
        items: [
            { // product ID
                type: "string"
            },
            { // quantity of this product
                type: "integer"
            }
        ]
    },
    totalPrice: {
        type: "number",
        default: 0
    }
});

module.exports = mongoose.model('Cart', cartSchema);