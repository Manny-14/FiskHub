const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
    },
    quantity : Number, // Not sure I would need quantity
    userId : String
}, {
    timestamps : true
})


const cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel