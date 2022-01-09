const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    customerID: {
        type: "string",
        require: true
    },
    totalCost: {
        type: "number",
        require: true
    },
    shipCost: {
        type: "number",
        default: 30
    },
    status: {
        type: "string", // Delivered or not
        default: "Delivery", // Delivery, Success, Fail
        require: true
    },
    products: { // list of products
        type: "array",
        default: []
    },
    address:{
        type: "string",
        default: ""
    },
    receiver:{
        type:"string",
    }
});

module.exports = mongoose.model('Order', orderSchema);