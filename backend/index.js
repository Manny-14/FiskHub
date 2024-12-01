const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
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
app.use(cookieParser())
app.use('/api', router)

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });

console.log("Does this even log")
const PORT = process.env.PORT || 8080
console.log("PORT", PORT)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to MongoDB')
        console.log(`Listening on port ${PORT}`)
    })
})
