const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const connectToMongoDb = require('./db')
connectToMongoDb()
const app = express()
const port =process.env.port
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/auth', require('./router/auth'))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})