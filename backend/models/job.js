const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
    name: String,
    from: String,
    to: String,
    image: String,
    favorite: {
        type: Boolean,
        required: true
    }
})

exports.Job = mongoose.model('Job', jobSchema);
