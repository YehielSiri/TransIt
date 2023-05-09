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


// let's use 'id' instead of '_id':
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
