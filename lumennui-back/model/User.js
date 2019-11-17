const mongoose = require('mongoose');

let User = mongoose.model('User', {
    pseudo: {
        type: String,
        required: true,
        unique: true
    }

});

module.exports = User;