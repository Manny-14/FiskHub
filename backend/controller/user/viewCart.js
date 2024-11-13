const cartModel = require("../../models/cart")

const viewCartController = async(req, res) => {
    try {
        const currUser = req.userId 

        const current_cart = await cartModel.find({
            userId : currUser
        }).populate("productId")

        res.json({
            data : current_cart,
            success : true,
            error : false
        })
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = viewCartController