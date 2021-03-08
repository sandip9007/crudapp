
const User = require('../models/users')
const express = require('express')
const { response } = require('express')

const userRoute = express.Router()

userRoute.get('/', (req, res)=>{
    res.render('home')
})

userRoute.post('/', async (req, res)=>{
    const user = await new User(req.body)
    user.save().then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send('You got this error'+err)
    })
})

module.exports = userRoute