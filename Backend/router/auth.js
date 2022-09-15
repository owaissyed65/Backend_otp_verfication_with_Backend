const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const request = require('../middleware/req')
const jwt = require('jsonwebtoken')
const getdata = require('../middleware/getdata')

// router 1 for signup
router.post('/signup', request, async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(401).json({ message: 'Please Enter Valid Information' })
        }
        const userExist = await User.findOne({ email: req.email })
        if (userExist) {
            res.status(400).json({ message: 'User Already Exist' })
        }
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.password, salt)
        const user = await User.create({ name: req.body.name, email: req.email, password: hash, country: req.body.country })
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// router 2 for login
router.post('/login', request, async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.email })
        if (!userExist) {
            res.status(400).json({ message: 'User Not Exist' })
        }
        const comparePassword = await bcrypt.compare(req.password, userExist.password);
        if (!comparePassword) {
            res.status(400).json({ message: 'Please Enter Correct Password Or Email' })
        }
        else {
            const Authorization = await jwt.sign({ _id: userExist._id }, process.env.token)
            res.status(200).json({ userExist, Authorization })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
})

// router 3 for get data 
router.get('/getdata', getdata, async (req, res) => {
    try {
        // console.log(req.id)
        const getdata = await User.findOne({ _id: req.id })
        res.status(200).json({ getdata })
    } catch (error) {
        res.status(500).json({ message: "Unable To Fetch Data Of User" })
    }
})
module.exports = router