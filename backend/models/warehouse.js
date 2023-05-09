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


// let's use 'id' instead of '_id':
warehouseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
warehouseSchema.set('toJSON', {
    virtuals: true,
});

exports.Warehouse = mongoose.model('Warehouse', warehouseSchema);
