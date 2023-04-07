const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

// A middleware (a body parser)
app.use(express.json());
app.use(morgan('tiny'));

app.get(`${api}/jobs`, (req, res) =>{
    const job = {
        id: 1,
        name: 'hair dresser',
        from: 'Hadar Dimoll',
        to: 'Karney Shomron',
        image: 'some_url',
    }
    res.send(job);
})

app.post(`${api}/jobs`, (req, res) =>{
    const newJob = req.body;
    console.log(newJob);
    res.send(newJob);
})

mongoose.connect(process.env.CONNECTION_STRING);

app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})