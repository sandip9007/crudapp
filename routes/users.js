
// const User = require('')
const express = require('express')

const userRoute = express.Router()

userRoute.get('/', (req, res)=>{
    res.render('home')
})

userRoute.post('/', (req, res)=>{
    res.send(req.body)
})

module.exports = userRoute