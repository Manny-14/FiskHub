const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    rating : Number,
    ratingsReceived : Number,
    productsRated: {
        type : Object,
        of : Number,
        default : {}
    }
},{
    timestamps : true
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel