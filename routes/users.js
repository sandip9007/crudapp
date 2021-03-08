
const User = require('../models/users')
const express = require('express')
const { response } = require('express')
const axios = require('axios')
const userRoute = express.Router()

userRoute.get('/', async (req, res)=>{
    await axios.get('https://new-crud-app.herokuapp.com/users').then((response)=>{
    // console.log(response.data)
    res.render('home', {
        user : response.data
    })
})
})

userRoute.get('/users', (req, res)=>{
    User.find().then((user)=>{
        res.send(user)
    }).catch((error)=>{
        res.send(error)
    })
})


userRoute.post('/', async (req, res)=>{
    const user = await new User(req.body)
    user.save().then((user)=>{
        res.render('home')
    }).catch((err)=>{
        // res.status(400).send('You got this error'+err)
        res.render('home', {
            message : err
        })
    })
})


module.exports = userRoute