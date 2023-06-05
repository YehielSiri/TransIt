const mongoose = require('mongoose');

const warehouseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
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
})


// let's use 'id' instead of '_id':
warehouseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
warehouseSchema.set('toJSON', {
    virtuals: true,
});

exports.Warehouse = mongoose.model('Warehouse', warehouseSchema);
