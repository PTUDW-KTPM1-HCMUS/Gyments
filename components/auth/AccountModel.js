const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
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
    email: { //email is email of user
        type: "string",
        require: true
    },
    userType: {
        type: "boolean",
        require: true,
        default: 0 // true is admin, false is user
    },
    createAt: {
        type: Date,
        default: Date.now()
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
    avatar: {
        type: "string",
        default: "https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
    },
    avatarID: {
        type: "string"
    }
});

module.exports = mongoose.model('Account', accountSchema);