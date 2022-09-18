const mongoose = require('mongoose')
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true,
        default: 'Pakistan',
    },
    date: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String,
        default: otpGenerator.generate(5, { digits: true, upperCaseAlphabets: false, specialChars: false }),
        index: true,
    }


})
const User = mongoose.model('user', userSchema)
User.createIndexes();
module.exports = User