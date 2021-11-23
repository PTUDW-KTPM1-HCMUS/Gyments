const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true,
        default: 1 // true is active, false is banned
    },
    userType: {
        type: Boolean,
        require: true,
        default: 0 // false is normal user, true is admin
    }
});

module.exports = mongoose.model('Account', accountSchema);