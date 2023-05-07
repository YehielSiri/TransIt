const { StatusTrunk } = require('../models/statusTrunk');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const statusTrunkList = await StatusTrunk.find();

    if(!statusTrunkList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(statusTrunkList);
})

router.get('/:id', async(req, res) =>{
    const statusTrunk = await StatusTrunk.findById(req.params.id);

    if(!statusTrunk) {
        res.status(500).json({message: 'The statusTrunk with the given ID was not found.'})
    }
    res.status(200).send(statusTrunk);
})

router.post('/', async (req, res)=> {
    // Build the statusTrunk to post
    let statusTrunk = new StatusTrunk({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    statusTrunk = await statusTrunk.save();

    if(!statusTrunk)
        return res.status(404).send('The statusTrunk cannot be created!')

    res.send(statusTrunk);
})

router.put('/:id', async(req, res) => {
    const statusTrunk = await StatusTrunk.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {new: true}
    )

    if(!statusTrunk)
    return res.status(404).send('The statusTrunk cannot be created!')

    res.send(statusTrunk);

})

router.delete('/:statusTrunkID', (req, res) =>{
    StatusTrunk.findByIdAndRemove(req.params.statusTrunkID).then(statusTrunk =>{
        if(statusTrunk) {
            return res.status(200).json({success: true, message: 'The statusTrunk is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'StatusTrunk not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;