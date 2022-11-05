/////////////////////////////////////////////////////
const mongoose = require('../config/mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

/////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        sparse: true // dup kee problem
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isReged: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/////////////////////////////////////////////////////
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, config.get('PrivateKey'));
    return token;
};

/////////////////////////////////////////////////////
module.exports = mongoose.model('User', userSchema);