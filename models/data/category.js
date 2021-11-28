const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryID: {
        type: "string",
        require: true
    },
    name: {
        type: "string",
        require: true
    }
});

module.exports = mongoose.model('Category', categorySchema);