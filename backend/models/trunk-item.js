const mongoose = require('mongoose');

const trunkItemSchema = mongoose.Schema({
    // quantity: {
    //     type: Number,
    //     required: true
    // },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
})

exports.TrunkItem = mongoose.model('TrunkItem', trunkItemSchema);

