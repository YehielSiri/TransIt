const {Warehouse} = require('../models/warehouse');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) =>{
    const warehouseList = await Warehouse.find();

    if(!warehouseList) {
        res.status(500).json({success: false})
    }
    res.send(warehouseList);
})

module.exports = router;