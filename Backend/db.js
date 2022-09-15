const mongoose = require('mongoose')
const mongooseUri = process.env.uri
const connectToMongoDb = () =>{
    mongoose.connect(mongooseUri,()=>{
        console.log("Connect To Mongoose Successfully")
    })
}
module.exports = connectToMongoDb