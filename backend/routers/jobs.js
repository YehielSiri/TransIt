const Job = require('../models/job');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const jobList = await Job.find()
    
    if(!jobList) {
        res.status(500).json({success: false})
    }
    res.send(jobList);
})

router.post(`/`, (req, res) =>{
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

module.exports = router;