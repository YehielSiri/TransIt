const { Warehouse } = require('../models/warehouse');
const { Category } = require('../models/category');
const { Job } = require('../models/job');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) =>{
    const jobList = await Job.find().select/*('name image -_id');*/().populate('category');
    
    if(!jobList) {
        res.status(500).json({success: false})
    }
    res.send(jobList);
})

router.get(`/:id`, async (req, res) =>{
    const job = await Job.findById(req.params.id).populate('category');
    
    if(!job) {
        res.status(500).json({success: false})
    }
    res.send(job);
})

router.post(`/`, async (req, res) =>{
    const warehouse = await Warehouse.findById(req.body.warehouse);
    if(!warehouse)
        return res.status(400).send('Invalid warehouse!')

    const category = await Category.findById(req.body.category);
    if(!category)
        return res.status(400).send('Invalid category!')

    let job = new Job({
        warehouse: req.body.warehouse,
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        urgancy: req.body.urgancy,
        isCooled: req.body.isCooled,
        dateCreated: req.body.dateCreated,
        deliveryTime: req.body.deliveryTime,
        status: req.body.status,
        isFavorite: req.body.favorite
    })

    job = await job.save();

    if(!job)
        return res.status(500).send('The job cannot be created!')

    res.send(job);
    //res.send(newJob);
})


router.put('/:id', async(req, res) => {
    if(!mongoose.isValidObjectId(req.params.id))
        res.status(400).send('Invalid job ID');
    // Check if this warehouse id is realy exist
    const warehouse = await Warehouse.findById(req.body.warehouse);
    if(!warehouse)
        return res.status(400).send('Invalid warehouse!')


    const job = await Job.findByIdAndUpdate(
        req.params.id,
        {
            warehouse: req.body.warehouse,
            name: req.body.name,
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            urgancy: req.body.urgancy,
            isCooled: req.body.isCooled,
            dateCreated: req.body.dateCreated,
            deliveryTime: req.body.deliveryTime,
            status: req.body.status,
            isFavorite: req.body.favorite
        },
        {new: true}
    )

    if(!job)
    return res.status(404).send('The job cannot be updated!')

    res.send(job);

})

router.delete('/:id', (req, res) =>{
    Job.findByIdAndRemove(req.params.id).then(job =>{
        if(category) {
            return res.status(200).json({success: true, message: 'The category is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'Category not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})


module.exports = router;