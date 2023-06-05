const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/:id', async(req, res) =>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
    res.status(200).send(user);
})


router.post(`/`, async (req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 1),
        isCompany: req.body.isCompany,
        company: req.body.company,
        street: req.body.street,
        house: req.body.house,
        // floor: req.body.floor,
        // apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        phone: req.body.phone,
    })

    user = await user.save();

    if(!user)
        return res.status(500).send('The user cannot be created!')

    res.send(user);
})


router.put('/:id', async(req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            isCompany: req.body.isCompany,
            company: req.body.company,
            street: req.body.street,
            house: req.body.house,
            // floor: req.body.floor,
            // apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            phone: req.body.phone,
        },
        {new: true}
    )

    if(!user)
    return res.status(404).send('The user cannot be updated!')

    res.send(user);

})


module.exports =router;