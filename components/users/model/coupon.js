const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponID: {
        type: "string",
        require: true
    },
    discountPercent: {
        type: "number",
        default: 10
    },
    status: {
        type: "string",
        require: true
    },
    expirationTime: {
        type: "string",
        require: true
    }
});

module.exports = mongoose.model('Coupon', couponSchema);