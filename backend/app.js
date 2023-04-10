const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

// A middleware (a body parser)
app.use(express.json());
app.use(morgan('tiny'));

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

const Job = mongoose.model('Job', jobSchema);

app.get(`${api}/jobs`, async (req, res) =>{
    const jobList = await Job.find()
    
    if(!jobList) {
        res.status(500).json({success: false})
    }
    res.send(jobList);
})

app.post(`${api}/jobs`, (req, res) =>{
    const job = new Job({
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        image: req.body.image,
        favorite: req.body.favorite
    })

    job.save().then((createdJob => {
        res.status(201).json(createdJob)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    //res.send(newJob);
})

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'transit-database'
})
.then(()=> {
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})