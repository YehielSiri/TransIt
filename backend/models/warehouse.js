const mongoose = require('mongoose');

const warehouseSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: [true, "What is your warehouse's address?"],
        maxLength: [50, "Address can not be more than 50 characters"],
    },
})

exports.Warehouse = mongoose.model('Warehouse', warehouseSchema);
