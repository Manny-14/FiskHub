const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose') // Idk what this does
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use('/api', router)
app.use(cookieParser())

const PORT = 8080 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to MongoDB')
        console.log(`Listening on port ${PORT}`)
    })
})