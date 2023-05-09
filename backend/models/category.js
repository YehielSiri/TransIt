const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
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
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
categorySchema.set('toJSON', {
    virtuals: true,
});

exports.Category = mongoose.model('Category', categorySchema);
