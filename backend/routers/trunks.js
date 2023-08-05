const {Trunk} = require('../models/trunk');
const express = require('express');
const { Job } = require('../models/job');
const { TrunkItem } = require('../models/trunk-item');
const router = express.Router();


router.get(`/`, async(req, res) =>{
    const trunkList = await Trunk.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!trunkList) {
        res.status(500).json({success: false})
    }
    res.send(trunkList);
})


router.get(`/:id`, async (req, res) =>{
    const trunk = await Trunk.findById(req.params.id)
        .populate('courior', 'name')
        .populate({
            path: 'trunkItems', populate: {
                path: 'job', populate: 'warehouse'}})
        .populate({ 
            path: 'trunkItems', populate: {
                path: 'job', populate: 'category'}})
        .populate({
            path: 'trunkItems', populate: {
                path: 'job', populate: 'status'}})
        .populate('status');

    if(!trunk) {
        res.status(500).json({success: false})
    } 
    res.send(trunk);
})


router.post('/', async (req, res) => {

    // Build the trunk items and the ids list
    // const trunkItemsIds = Promise.all(req.body.trunkItems.map(async (trunkItem) => {
    //     let newTrunkItem = new TrunkItem({
    //         job: trunkItem.job
    //     })

    //     newTrunkItem = await newTrunkItem.save();

    //     return newTrunkItem._id;
    // }))
    const trunkItemsIds = Promise.all(req.body.trunkItems.map(async (trunkItem) => {
        return trunkItem._id;
    }))
    const trunkItemsIdsResolved = await trunkItemsIds;

    // Calculate the total price of the whole trunk
    const itemPrices = await Promise.all(trunkItemsIdsResolved.map(async (trunkItemId) => {
        const trunkItem = await Job.findById(trunkItemId)/*.populate('price')*/;
        const itemPrice = trunkItem.price;
        return itemPrice
    }))

    const totalPrice = itemPrices.reduce((a,b) => a + b , 0);

    let trunk = new Trunk({
        trunkItems: trunkItemsIdsResolved,
        courior: req.body.user,
        totalPrice: totalPrice,
        status: req.body.status,
    })
    trunk = await trunk.save();

    if(!trunk)
    return res.status(400).send('the trunk cannot be created!')

    res.send(trunk);
})


router.put('/:id',async (req, res)=> {
    const trunk = await Trunk.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!trunk)
    return res.status(400).send('the trunk cannot be update!')

    res.send(trunk);
})


router.delete('/:id', (req, res)=>{
    Trunk.findByIdAndRemove(req.params.id).then(trunk => {
        if(trunk) {
    // // for delete a sub-object 'trunk-item':
    // .then(async trunk =>{
    //     if(trunk) {
    //         await trunk.trunkItems.map(async trunkItem => {
    //             await TrunkItem.findByIdAndRemove(trunkItem)
    //         })
            return res.status(200).json({success: true, message: 'the trunk is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "trunk not found!"})
        }
    }).catch(err => {
       return res.status(500).json({success: false, error: err}) 
    })
})


// Some POST / GET requests of statistical data:
// Total shipping cost
router.get('/get/totalCost', async (req, res)=> {
    const totalSales = await Trunk.aggregate([
        { $group: { _id: null , totalsales: { $sum: '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The trunk sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})
// Total trunks which had loaded
router.get(`/get/count`, async (req, res) =>{
    const trunkCount = await Trunk.countDocuments((count) => count)

    if(!trunkCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        trunkCount: trunkCount
    });
})
// To extract a specific courier delivery history
router.get(`/get/usertrunks/:userid`, async (req, res) =>{
    const userTrunksList = await Trunk.find({user: req.params.userid}).populate({ 
        path: 'trunkItems', populate: {
            path: 'job', populate: 'category'}
        }).sort({'dateTrunked': -1});

    if(!userTrunksList) {
        res.status(500).json({success: false})
    } 
    res.send(userTrunkList);
})



module.exports = router;