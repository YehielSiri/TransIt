const { Warehouse } = require('../models/warehouse');
const { Category } = require('../models/category');
const { Job } = require('../models/job');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        // For not getting the file name with '%2' repalcing every space:
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });


router.get(`/`, async (req, res) =>{
    // filter by categories - localhost:3000/api/v1/jobs?categories=firstID,secondID
    let filter = {}
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }

    const jobList = await Job.find(filter).populate('category');
    
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

router.post(`/`, uploadOptions.single('image'), async (req, res) =>{
    const warehouse = await Warehouse.findById(req.body.warehouse);
    if(!warehouse)
        return res.status(400).send('Invalid warehouse!')

    const category = await Category.findById(req.body.category);
    if(!category)
        return res.status(400).send('Invalid category!')

    const file = req.file;
    if (!file) 
        return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let job = new Job({
        warehouse: req.body.warehouse,
        name: req.body.name,
        fromStreet: req.body.fromStreet,
        fromHouse: req.body.fromHouse,
        // fromFloor: req.body.fromFloor,
        // fromApartment: req.body.fromApartment,
        fromCity: req.body.fromCity,
        fromZip: req.body.fromZip,
        toStreet: req.body.toStreet,
        toHouse: req.body.toHouse,
        // toFloor: req.body.toFloor,
        // toApartment: req.body.toApartment,
        toCity: req.body.toCity,
        toZip: req.body.toZip,
        description: req.body.description,
        image:  `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
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


router.put('/:id', uploadOptions.single('image'), async(req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid job ID')
    }
    // Check if this warehouse id is realy exist
    const warehouse = await Warehouse.findById(req.body.warehouse);
    if(!warehouse)
        return res.status(400).send('Invalid warehouse!')

    const category = await Category.findById(req.body.category);
    if (!category) 
        return res.status(400).send('Invalid Category');

    const job = await Job.findById(req.params.id);
    if (!job) 
        return res.status(400).send('Invalid job!');
    
    
    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }
    
    
    const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        {
            warehouse: req.body.warehouse,
            name: req.body.name,
            fromStreet: req.body.fromStreet,
            fromHouse: req.body.fromHouse,
            // fromFloor: req.body.fromFloor,
            // fromApartment: req.body.fromApartment,
            fromCity: req.body.fromCity,
            fromZip: req.body.fromZip,
            toStreet: req.body.toStreet,
            toHouse: req.body.toHouse,
            // toFloor: req.body.toFloor,
            // toApartment: req.body.toApartment,
            toCity: req.body.toCity,
            toZip: req.body.toZip,
            description: req.body.description,
            image: imagepath,
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

    if(!updatedJob)
    return res.status(404).send('The job cannot be updated!')

    res.send(updatedJob);

})

router.delete('/:id', (req, res) =>{
    Job.findByIdAndRemove(req.params.id).then(job =>{
        if(job) {
            return res.status(200).json({success: true, message: 'The job is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'Job not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})


// This get return 'MongooseError: Model.countDocuments() no longer accepts a callback'
// Take care of that or delete!
router.get(`/get/count`, async (req, res) =>{
    const jobCount = await Job.countDocuments((count) => count)        
    
    if(!jobCount) {
        res.status(500).json({success: false})
    }
    res.send({
        jobCount: jobCount
    });
})


router.get(`/get/featured/:count`, async (req, res) =>{
    // take the limit for favorited jobs - Number or 0
    const count = req.params.count ? req.params.count : 0;

    const jobs = await Job.find({isFavorite: true}).limit(+count);
    // "+count" for casting from string to number        
    
    if(!jobs) {
        res.status(500).json({success: false})
    }
    res.send(jobs);
})

// A specific API for handling uploading gallery of images
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid job Id');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
        });
    }

    const job = await Job.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    );

    if (!job) return res.status(500).send('the gallery cannot be updated!');

    res.send(job);
});

module.exports = router;