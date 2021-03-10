
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
    console.log(response.data)
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
    res.render('adduser', {
        message : ""
    })
})

//Create User
userRoute.post('/adduser', async (req, res)=>{
    const user = await new User(req.body)
    user.save().then((user)=>{
        res.render('adduser', {
            message : "User added"
        })
    }).catch((err)=>{
        // res.status(400).send('You got this error'+err)
        res.render('adduser', {
            message : err
        })
    })
})

//Edit user
userRoute.get('/edituser', async (req, res)=>{

    if(req.query.id){
        const user = await User.findById(req.query.id)
        res.render('edituser', {
            name : user.name,
            email : user.email,
            gender : user.gender,
            message : ''
        })
    }
})

userRoute.post('/edituser', async (req, res)=>{
    if(req.query.id){
        const id = req.query.id
        

        const updatedlist =  Object.keys(req.body)
        const allowedUpdate = [
        "name",
        "email",
        ]
        const matchedUpdate = updatedlist.every((keys)=>{
            return allowedUpdate.includes(keys)
         })
        
         try {
            const user =  await User.findById(id)
            allowedUpdate.forEach((key)=>{
                // console.log(req.body[key] + ' = ' + user[key])
                user[key] = req.body[key]
        
            })
            user.save().then((user)=>{
                res.render('edituser', {
                    name : user.name,
                    email : user.email,
                    message : 'Sucessfully updated'
                })
            }).catch((error)=>{
                
                // console.log("Save "+error['name'])   
                 
                // console.log("Save "+error)  
                // res.json(error)
                if(error['name'] === "MongoError"){
                    res.render('edituser', {
                        name : user.name,
                        email : user.email,
                        message : 'This email is already in use'
                    })
                }
            })
        
        } catch (error) {   
            
            console.log("Try Catch "+error)   
        }
     
    }
})

//Image upload

userRoute.post('/uploadimage', upload, async (req, res)=>{
   if(req.query.id){
       const user = await User.findById(req.query.id)
       user.avatar = req.file.filename
       user.save().then(()=>{
        res.render('uploadimage', {
            message : "Image uploaded sucessfully"
        })
       }).catch((error)=>{
           res.send(error)
       })
   }

}, (err, req, res, next)=>{
    res.status(400).send({ error : err.message})
})

userRoute.get('/uploadimage', (req, res)=>{
    res.render('uploadimage', {
        message : ""
    })
})

//Delete user
userRoute.get('/deleteuser', async (req, res, next)=>{
    
    if(req.query.id){
        const user = await User.findByIdAndRemove(req.query.id)
        const userAll = User.find({})

        await axios.get('https://new-crud-app.herokuapp.com/users').then((response)=>{

            console.log(response.data)
            res.render('home', {
                user : response.data
            })

        })
    
    }
})


userRoute.get('/showimage', (req, res)=>{
    User.find().then((user)=>{
        res.send(`<img src="/uploads/${user[0].avatar}" >`)
        // console.log(user[0].email)
    })
})



module.exports = userRoute