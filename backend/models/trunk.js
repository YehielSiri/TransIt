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

exports.Trunk = mongoose.model('Trunk', trunkSchema);
