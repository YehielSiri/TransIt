const {Trunk} = require('../models/trunk');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) =>{
    const trunkList = await Trunk.find();

    if(!trunkList) {
        res.status(500).json({success: false})
    }
    res.send(trunkList);
})

module.exports = router;