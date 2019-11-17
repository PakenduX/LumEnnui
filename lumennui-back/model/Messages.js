const mongoose = require('mongoose');

let Messages = mongoose.model('Messages', {
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

});

module.exports = Messages;