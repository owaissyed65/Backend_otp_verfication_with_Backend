const mongoose = require('mongoose')

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
        default: Math.floor(Math.random() * 10000 ),
        index: true,
    }


})
const User = mongoose.model('user', userSchema)
User.createIndexes();
module.exports = User