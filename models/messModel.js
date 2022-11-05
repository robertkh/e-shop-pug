/////////////////////////////////////////////////////
const mongoose = require('../config/mongoose')

/////////////////////////////////////////////////////
const messSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        maxlength: 64
    },
    message: {
        type: String,
        required: true,
        maxlength: 512
    },
    created: {
        type: Date,
        default: Date.now
    }

});

/////////////////////////////////////////////////////
module.exports = mongoose.model('Message', messSchema);