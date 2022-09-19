const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const request = require('../middleware/req')
const jwt = require('jsonwebtoken')
const getdata = require('../middleware/getdata')
const otpGenerator = require('otp-generator')
const sendEmail = require('../middleware/sendEmail')
const { db } = require('../models/User')
let checkEmail;
// router 1 for signup
router.post('/signup', request, async (req, res) => {
    try {
        // verify or validate
        if (!req.body.name) {
            return res.status(401).json({ message: 'Please Enter Valid Information' })
        }
        // find user exist or not
        const userExist = await User.findOne({ email: req.email })
        // condition or not
        if (userExist) {
            return res.status(400).json({ message: 'User Already Exist' })
        }
        //hash password
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.password, salt);
        const user = await User.create
        ({
            name: req.body.name,
            email: req.email,
            password: hash,
            country: req.body.country,
            otp: otpGenerator.generate(5, { digits: true, upperCaseAlphabets: false, specialChars: false }),
        })
        await user.save()
        const userVerify = await User.findOne({ email: req.email })
        const Authorization = await jwt.sign({ _id: userVerify._id }, process.env.token)
        await sendEmail(userVerify.email, userVerify.otp)
        res.status(201).json({ message: "Please Enter Otp to verify Your Email", Authorization })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
})
// router 2 for verify user use otp code
router.post('/verify', getdata, async (req, res) => {
    try {
        if (!req.body.otp) {
            return res.send({ message: "please Enter Otp Code" })
        }
        else {
            const userVerify = await User.findOne({ _id: req.id, otp: req.body.otp, }).select('-otp').select('-password')
            if (!userVerify) {
                const dltUser = await User.deleteOne({ _id: req.id })
                return res.json({ dltUser })
            }
            else {
                return res.status(200).json({ userVerify })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
})
// router 3 for login
router.post('/login', request, async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.email })
        if (!userExist) {
            return res.status(400).json({ message: 'User Not Exist' })
        }
        const comparePassword = await bcrypt.compare(req.password, userExist.password);
        if (!comparePassword) {
            return res.status(400).json({ message: 'Please Enter Correct Password Or Email' })
        }
        else {
            const Authorization = await jwt.sign({ _id: userExist._id }, process.env.token)
            return res.status(200).json({ userExist, Authorization })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
})
// router 4 to forgotpassword
router.put('/login/forgetpassword', async (req, res) => {
    try {
        const { email } = req.body;
        checkEmail = email
        const findUSer = await User.findOne({ email: email })
        if (!findUSer) {
            return res.send({ message: "User Not Exist " })
        }
        let otp = { otp: otpGenerator.generate(5, { digits: true, upperCaseAlphabets: false, specialChars: false }) }
        const changeOtp = await User.findByIdAndUpdate(findUSer._id, { $set: otp }, { new: true })
        await sendEmail(email, changeOtp.otp);
        res.status(201).json({ message: 'Please Enter Your New Otp Code' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
})
// router 5 forgetpassword otp
router.post('/password/otp', async (req, res) => {
    try {
        if (!req.body.otp) {
            res.send({ message: "please Enter Otp Code" })
        }
        const userVerify = await User.findOne({ otp: req.body.otp }).select('-otp').select('-password')
        if (!userVerify) {
            return res.status(401).send({ message: "Please Enter Write Otp code that we are provided" })
        }
        else {
            return res.status(200).json({ message: 'You Can Change Password Now' })
        }
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
})
// router 6 for changePassword
router.put('/changepassword', async (req, res) => {
    try {
        const { newPassword } = req.body;
        const findUSer = await User.findOne({ email: checkEmail })
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(newPassword, salt);
        const password = { password: hash }
        const changeOtp = await User.findByIdAndUpdate(findUSer._id, { $set: password }, { new: true })
        res.status(201).json({ message: 'Successfully change A Password', changeOtp: changeOtp.email })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
})

// router 7 for get data 
router.get('/getdata', getdata, async (req, res) => {
    try {

        const getdata = await User.findOne({ _id: req.id })
        res.status(200).json({ getdata })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})
module.exports = router