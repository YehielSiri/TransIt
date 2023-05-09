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
    from: {
        type: String, // Think, does it the most correct type?? maybe 'Address'
        required: true
        // ***** 'defalt: ' - set here as a defalt the company address!
    },
    to: {
        type: String, // Think, does it the most correct type?? maybe 'Address'
        required: true
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
        required: true
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
