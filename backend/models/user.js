const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "We need an email to keep you safe"],
    },
    passwordHash: {
        type: String,
        required: [true, "Password is required"]
    },
    isCompany: {
        type: Boolean,
        required: true,
        default: false,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: [true, "What is your warehouse's address?"],
        maxLength: [50, "Address can not be more than 50 characters"],
    },
    phone: {
        type: Number,
        required: [true, "A phone number is required"],
    },
})

exports.User = mongoose.model('User', userSchema);
