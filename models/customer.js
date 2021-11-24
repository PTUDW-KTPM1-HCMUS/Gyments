const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    customerID: {
        type: "string",
        require: true
    },
    name: {
        type: "string",
        require: true
    },
    address: {
        type: "string",
        require: true
    },
    phone: {
        type: "string",
        require: true
    },
    gender: {
        type: "string",
        require: true
    },
    email: {
        type: "string",
        require: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);