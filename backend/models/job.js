const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
        // set this field authmaticly
    },
    name: {
        type: String,
        required: true
    },
    // From:
    // ***** 'defalt: ' - set here as a defalt the company address!
    fromStreet: {
        type: String,
        required: [true, "What is your street name?"],
        maxLength: [50, "A street name can not be longer than 50 characters"],
    },
    fromHouse: {
        type: Number,
        required: [true, "What is your house's number?"],
        maxLength: [5, "A house number can not be longer than 5 characters"],
    },
    // fromFloor: {
    //     type: Number,
    //     required: [true, "What is your house's floor?"],
    //     maxLength: [5, "There is still no four-digit floor"],
    // },
    // fromApartment: {
    //     type: String,
    //     required: [true, "What is your apartment ID?"],
    //     maxLength: [50, "Apartment ID can not be longer than 50 characters"],
    // },
    fromCity: {
        type: String,
        required: [true, "In what city is your house?"],
        maxLength: [50, "A city name can not be longer than 50 characters"],
    },
    fromZip: {
        type: Number,
        required: [true, "What is your zip code?"],
        maxLength: [7, "Zip code can not be longer than 7 characters"],
    },
    // To:
    toStreet: {
        type: String,
        required: [true, "What is your street name?"],
        maxLength: [50, "A street name can not be longer than 50 characters"],
    },
    toHouse: {
        type: Number,
        required: [true, "What is your house's number?"],
        maxLength: [5, "A house number can not be longer than 5 characters"],
    },
    // toFloor: {
    //     type: Number,
    //     required: [true, "What is your house's floor?"],
    //     maxLength: [5, "There is still no four-digit floor"],
    // },
    // toApartment: {
    //     type: String,
    //     required: [true, "What is your apartment ID?"],
    //     maxLength: [50, "Apartment ID can not be longer than 50 characters"],
    // },
    toCity: {
        type: String,
        required: [true, "In what city is your house?"],
        maxLength: [50, "A city name can not be longer than 50 characters"],
    },
    toZip: {
        type: Number,
        required: [true, "What is your zip code?"],
        maxLength: [7, "Zip code can not be longer than 7 characters"],
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    images: {
        type: String
    },
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    urgency: {
        type: Number,
        default: 0,
        min: 0,
        max: 2
    },
    isCooled: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    deliveryTime: {
        type: Date,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StatusJob',
        required: true,
    },
    isFavorite: {
        type: Boolean,
        required: true,
        default: false,
    }
})

// let's use 'id' instead of '_id':
jobSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
jobSchema.set('toJSON', {
    virtuals: true,
});

exports.Job = mongoose.model('Job', jobSchema);
