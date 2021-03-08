const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
// const router = require('./server/routes/router')
const urlEncode = bodyParser.urlencoded({ extended : true })

// const connectDB = require('./server/database/connection')
const app = express()


dotenv.config({ path : 'config.env'})
const port = process.env.PORT || 4400


// //Parser 
// app.use(express.json())
// app.use(urlEncode)


// //Log request
// app.use(morgan('tiny'))


// //Mongodb connection
// connectDB()
// //Set view enginee
// app.set('view engine', 'ejs')
// // app.use('views', path.resolve(__dirname, 'views/pathname')) for preference

// //Load static directories
// app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
// app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
// app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))



// //Load routers
// app.use(router)
app.listen(port, ()=>{
    console.log(`Server is up on port http://localhost:${port}/`)
})

