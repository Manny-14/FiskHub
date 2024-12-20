const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    posterName : String,
    posterId : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    productCondition : String,
    sold : String,
}, {
    timestamps : true
})


const productModel = mongoose.model("product", productSchema)

module.exports = productModel