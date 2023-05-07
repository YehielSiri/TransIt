const mongoose = require('mongoose');

// Build a router or delete this file
const statusJobSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    },
})

exports.StatusJob = mongoose.model('StatusJob', statusJobSchema);
