const mongoose = require('mongoose');

const trunkSchema = mongoose.Schema({
    courior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "There is no trunk of nobody"],
    },
    jobs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, "An empty trunk worth nothing"]
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StatusTrunk',
        default: 'closed',
    },
})


// let's use 'id' instead of '_id':
trunkSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// enable set a virtual (for setting 'id') to the job schema
trunkSchema.set('toJSON', {
    virtuals: true,
});

exports.Trunk = mongoose.model('Trunk', trunkSchema);
