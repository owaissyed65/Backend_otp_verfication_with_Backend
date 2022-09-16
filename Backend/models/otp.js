const mongoose = require('mongoose');
const { db } = require('./User');

const otpSchema = new mongoose.Schema({

})

const otp = mongoose.model('comment', otpSchema)
module.exports = otp;
