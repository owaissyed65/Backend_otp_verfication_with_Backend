const req = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(401).json({ message: 'Please Enter Valid Information' })
    }
    req.email = email
    req.password = password
    
    
    next()
}
module.exports = req