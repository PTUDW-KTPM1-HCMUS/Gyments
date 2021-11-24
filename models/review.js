const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    id: {
        type: "string",
        require: true
    },
    customerID: {
        type: "string",
        require: true
    },
    productID: {
        type: "string",
        require: true
    },
    summary: {
        type: "string",
        require: true
    },
    reviewDetail: {
        type: "string",
        require: true
    },
    status: {
        type: "boolean",
        default: 1
    },
    rate: {
        type: "object",
        properties: {
            quality: {
                type: "integer"
            },
            price: {
                type: "integer"
            },
            value: {
                type: "integer"
            }
        }
    }
});

module.exports = mongoose.model('Review', reviewSchema);