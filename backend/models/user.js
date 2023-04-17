const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    isCompany: {
        type: Boolean,
        required: true
    },
    phone: Number
})

exports.User = mongoose.model('User', userSchema);
