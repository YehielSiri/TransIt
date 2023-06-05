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
        type: String,
        default: '',
    },
    street: {
        type: String,
        required: [true, "What is your street name?"],
        maxLength: [50, "A street name can not be longer than 50 characters"],
    },
    house: {
        type: Number,
        required: [true, "What is your house's number?"],
        maxLength: [5, "A house number can not be longer than 5 characters"],
    },
    // floor: {
    //     type: Number,
    //     required: [true, "What is your house's floor?"],
    //     maxLength: [5, "There is still no four-digit floor"],
    // },
    // apartment: {
    //     type: String,
    //     required: [true, "What is your apartment ID?"],
    //     maxLength: [50, "Apartment ID can not be longer than 50 characters"],
    // },
    city: {
        type: String,
        required: [true, "In what city is your house?"],
        maxLength: [50, "A city name can not be longer than 50 characters"],
    },
    zip: {
        type: Number,
        required: [true, "What is your zip code?"],
        maxLength: [7, "Zip code can not be longer than 7 characters"],
    },
    phone: {
        type: String,
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
exports.userSchema = userSchema;