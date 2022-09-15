const jwt = require('jsonwebtoken')

const getdata = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            res.status(401).json({ message: 'Please provide Valid Authentication Token' })
        }
        const id = await jwt.verify(token, process.env.token)
        req.id = id;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Invalid AuthToken" })
    }
}
module.exports = getdata