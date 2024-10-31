const { timeStamp } = require('console')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    posterName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    productCondition : String,
}, {
    timestamps : true
})


const productModel = mongoose.model("product", productSchema)

module.exports = productModel