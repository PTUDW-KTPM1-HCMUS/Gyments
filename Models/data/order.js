const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderID: {
        type: "string",
        require: true
    },
    date: {
        type: "string",
        require: true
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
        default: 0
    },
    status: {
        type: "string", // Delivered or not
        require: true
    },
    couponID: {
        type: "string"
    }
});

module.exports = mongoose.model('Order', orderSchema);