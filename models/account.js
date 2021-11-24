const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: { //username is email of user
        type: "string",
        require: true
    },
    password: {
        type: "string",
        require: true
    },
    status: {
        type: "boolean",
        require: true,
        default: 1 // true is active, false is banned
    },
    userType: {
        type: "boolean",
        require: true,
        default: 0 // false is normal user, true is admin
    }
});

module.exports = mongoose.model('Account', accountSchema);