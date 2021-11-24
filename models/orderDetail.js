const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    orderID: {
        type: "string",
        require: true
    },
    products: { // list of products
        type: "array",
        items: [
            { // product ID
                type: "string"
            },
            { // quantity of this product
                type: "number"
            }
        ]
    }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);