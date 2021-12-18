const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customerID: {
        type: "string",
        default: null
    },
    products: { // list of products
        type: "array",
        default: []
    },
    totalPrice: {
        type: "number",
        default: 0
    }
});

module.exports = mongoose.model('Cart', cartSchema);