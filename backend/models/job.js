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
        type: String,
        required: true,
        default: 'onShelf' // Do you want it as a special schema!
    },
    isFavorite: {
        type: Boolean,
        required: true
    }
})

exports.Job = mongoose.model('Job', jobSchema);
