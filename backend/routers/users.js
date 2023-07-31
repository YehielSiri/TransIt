const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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


// Admin 'post request' - unlimited
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
        return res.status(400).send('The user cannot be created!')

    res.send(user);
})

router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
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
        { new: true}
    )

    if(!userUpdated)
    return res.status(400).send('the user cannot be created!')

    res.send(userUpdated);
})



router.post('/login', async(req, res) =>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('The user not found.')
    }

    // Authenticate
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        // User has already authenticated
        const token = jwt.sign(
            {
                userId: user.id,
                // Verify if its an admin. we don't want to do this in the frontend because security
                isAdmin: user.isAdmin 
            },
            secret,
            {expiresIn: '1w'}
        )

        res.status(200).send({user: user.email, token: token})
    } else {
        res.status(400).send('Password is wrong!')
    }

})

router.post('/register', async (req, res) => {
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
    return res.status(400).send('The user cannot be created!')

    res.send(user);
})


router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
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
        { new: true}
    )

    if(!userUpdated)
    return res.status(400).send('the user cannot be updated!')

    res.send(userUpdated);
})

router.delete('/:id', (req, res) =>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'The user is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'User not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})

// This get return 'MongooseError: Model.countDocuments() no longer accepts a callback'
// Take care of that or delete!
router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)        
    
    if(!userCount) {
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
})


module.exports =router;