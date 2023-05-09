const mongoose = require('mongoose');

const statusTrunkSchema = mongoose.Schema({
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
statusTrunkSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
statusTrunkSchema.set('toJSON', {
    virtuals: true,
});

exports.StatusTrunk = mongoose.model('StatusTrunk', statusTrunkSchema);
