const mongoose = require('mongoose');

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


// let's use 'id' instead of '_id':
statusJobSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
statusJobSchema.set('toJSON', {
    virtuals: true,
});

exports.StatusJob = mongoose.model('StatusJob', statusJobSchema);
