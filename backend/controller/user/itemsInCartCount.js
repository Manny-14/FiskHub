const cartModel = require("../../models/cart")

const itemsInCartCountController = async(req, res) => {
    try {
        const userId = req.userId

        const count = await cartModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "Items counted successfully",
            error : false,
            success : true
            
        })
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = itemsInCartCountController