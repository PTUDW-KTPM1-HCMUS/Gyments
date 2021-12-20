const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewID: {
        type: "string",
        require: true
    },
    userID: {
        type: "string",
        require: true
    },
    userAvatar: {
      type: "string"
    },
    productID: {
        type: "string",
        require: true
    },
    content: {
        type: "string",
        require: true
    },
    nickname: {
        type: "string"
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Review', reviewSchema);