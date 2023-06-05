const { User } = require('../models/user');
const { Warehouse } = require('../models/warehouse');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) =>{
    const warehouseList = await Warehouse.find();

    if(!warehouseList) {
        res.status(500).json({success: false})
    }
    res.send(warehouseList);
})


router.get('/:id', async(req, res) =>{
    const warehouse = await Warehouse.findById(req.params.id);

    if(!warehouse) {
        res.status(500).json({message: 'The warehouse with the given ID was not found.'})
    }
    res.status(200).send(warehouse);
})


router.post(`/`, async (req, res) =>{
    const user = await User.findById(req.body.user);
    if(!user)
        return res.status(400).send('Invalid user!')

    let warehouse = new Warehouse({
        user: req.body.user,
        name: req.body.name,
        street: req.body.street,
        house: req.body.house,
        // floor: req.body.floor,
        // apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
    })

    warehouse = await warehouse.save();

    if(!warehouse)
        return res.status(500).send('The warehouse cannot be created!')

    res.send(warehouse);
})

router.put('/:id', async(req, res) => {
    // Check if this user (courier company) id is realy exist
    const user = await User.findById(req.body.user);
    if(!user)
        return res.status(400).send('Invalid user!')


    const warehouse = await Warehouse.findByIdAndUpdate(
        req.params.id,
        {
            user: req.body.user,
            name: req.body.name,
            street: req.body.street,
            house: req.body.house,
            // floor: req.body.floor,
            // apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            },
        {new: true}
    )

    if(!warehouse)
    return res.status(404).send('The warehouse cannot be created!')

    res.send(warehouse);

})

router.delete('/:warehouseID', (req, res) =>{
    Warehouse.findByIdAndRemove(req.params.warehouseID).then(category =>{
        if(warehouse) {
            return res.status(200).json({success: true, message: 'The warehouse is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'Warehouse not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;