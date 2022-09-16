const express = require('express')
const getdata = require('../middleware/getdata')
const router = express.Router()

router.post('/post', getdata, async (req, res) => {
    if (!req.id) {
        res.status(401).json({ message: 'You cant Post Comment' })
    }
    console.log(req.body.message)
    
    // const comment = await Comment.create({
    //     'commentbox.messages.author': req.id,
    //     'commentbox.messages.message': req.body.message
    // })
    
    // await comment.save()
    // res.status(201).json(comment)
    console.log(req.id)

})

module.exports = router