const { StatusJob } = require('../models/statusJob');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const statusJobList = await StatusJob.find();

    if(!statusJobList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(statusJobList);
})

router.get('/:id', async(req, res) =>{
    const statusJob = await StatusJob.findById(req.params.id);

    if(!statusJob) {
        res.status(500).json({message: 'The statusJob with the given ID was not found.'})
    }
    res.status(200).send(statusJob);
})

router.post('/', async (req, res)=> {
    // Build the statusJob to post
    let statusJob = new StatusJob({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    statusJob = await statusJob.save();

    if(!statusJob)
        return res.status(404).send('The statusJob cannot be created!')

    res.send(statusJob);
})

router.put('/:id', async(req, res) => {
    const statusJob = await StatusJob.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {new: true}
    )

    if(!statusJob)
    return res.status(404).send('The statusJob cannot be created!')

    res.send(statusJob);

})

router.delete('/:statusJobID', (req, res) =>{
    StatusJob.findByIdAndRemove(req.params.statusJobID).then(statusJob =>{
        if(statusJob) {
            return res.status(200).json({success: true, message: 'The statusJob is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'StatusJob not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;