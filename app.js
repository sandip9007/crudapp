const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const userRoute = require('./routes/users')
const urlEncode = bodyParser.urlencoded({ extended : true })
const connectDB = require('./db/db')
// const connectDB = require('./server/database/connection')
const app = express()


dotenv.config({ path : 'config.env'})
const port = process.env.PORT || 4400


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'/views'))

app.use(express.json())
app.use(urlEncode)

// //Load routers
app.use(userRoute)
connectDB()
app.listen(port, ()=>{
    console.log(`Server is up on port http://localhost:${port}/`)
})

