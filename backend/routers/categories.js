const { Warehouse } = require('../models/warehouse');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})

router.get('/:id', async(req, res) =>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    }
    res.status(200).send(category);
})

router.post('/', async (req, res)=> {
    // Check if this warehouse id is realy exist
    const warehouse = await Warehouse.findById(req.body.warehouse);
    if(!warehouse)
        return res.status(400).send('Invalid warehouse!')

    // Build the category to post
    let category = new Category({
        warehouse: req.body.warehouse,
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    category = await category.save();

    if(!category)
        return res.status(404).send('The category cannot be created!')

    res.send(category);
})

router.put('/:id', async(req, res) => {
    // Check if this warehouse id is realy exist
    const warehouse = await Warehouse.findById(req.body.warehouse);
    if(!warehouse)
        return res.status(400).send('Invalid warehouse!')


    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            warehouse: req.body.warehouse,
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {new: true}
    )

    if(!category)
    return res.status(404).send('The category cannot be created!')

    res.send(category);

})

router.delete('/:categoryID', (req, res) =>{
    Category.findByIdAndRemove(req.params.categoryID).then(category =>{
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