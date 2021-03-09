
const User = require('../models/users')
const express = require('express')
const path = require('path')
const { response } = require('express')
const axios = require('axios')
const userRoute = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination : "./public/uploads/",
    filename : (req, file, cb)=>{
       cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({
  storage : storage
}).single('avatar')



userRoute.get('/', async (req, res)=>{
    await axios.get('https://new-crud-app.herokuapp.com/users').then((response)=>{
    // console.log(response.data)
    res.render('home', {
        user : response.data
    })
})
})

//Show
userRoute.get('/users', (req, res)=>{
    User.find().then((user)=>{
        res.send(user)
    }).catch((error)=>{
        res.send(error)
    })
})

userRoute.get('/adduser', (req, res)=>{
    res.render('adduser')
})

//Create User
userRoute.post('/adduser', async (req, res)=>{
    const user = await new User(req.body)
    user.save().then((user)=>{
        res.render('adduser')
    }).catch((err)=>{
        // res.status(400).send('You got this error'+err)
        res.render('home', {
            message : err
        })
    })
})


//Image upload

userRoute.post('/uploadimage', upload, async (req, res)=>{
   if(req.query.id){
       const user = await User.findById(req.query.id)
       user.avatar = req.file.filename
       user.save().then(()=>{
           res.send(user)
       }).catch((error)=>{
           res.send(error)
       })
   }
   

//    console.log(id)
}, (err, req, res, next)=>{
    res.status(400).send({ error : err.message})
})



userRoute.get('/uploadimage', (req, res)=>{
  res.render('uploadimage')
})

module.exports = userRoute