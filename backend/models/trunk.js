const mongoose = require('mongoose');

const trunkSchema = mongoose.Schema({
    // trunkItems: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'trunkItem',
    //     required: [true, "An empty trunk worth nothing"]
    // }],
    trunkItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, "An empty trunk worth nothing"]
    }],
    courior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "There is no trunk of nobody"],
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
        // default: 'closed', // How am I init a default value through ObjectID
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


/**
Trunk Example:

{
    "trunkItems" : [
        {
            "quantity": 3,
            "product" : "5fcfc406ae79b0a6a90d2585"
        },
        {
            "quantity": 2,
            "product" : "5fd293c7d3abe7295b1403c4"
        }
    ],
    "courior": "5fd51bc7e39ba856244a3b44",
    "totalPrice": "00000",
    "dateCreated": "Czech Republic",
    "status": "+420702241333",
}

 */