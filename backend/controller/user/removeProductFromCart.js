const cartModel = require("../../models/cart")

const removeProductFromCartController = async(req, res) => {
    try {
        const currentUserId = req.userId 
        const cartProductId = req.body._id

        const deleteProduct = await cartModel.deleteOne({ _id : cartProductId})

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        res.json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}

module.exports = removeProductFromCartController