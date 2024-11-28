const { error } = require("console")
const cartModel = require("../../models/cart")

const addToCartController = async(req, res) => {
    try {
        const { productId } = req?.body
        const user = req.userId

        const isProductAvailable = await cartModel.findOne({productId, userId: user}) // Pay attention to this because People might list singular items

        if(isProductAvailable) {
            return res.json({
                message : "Product Added to Cart already",
                success : false,
                error : true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : user,
        }

        const newAddToCart = new cartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data : saveProduct,
            message : "Product Added to cart",
            success : true,
            error : false
        })


    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController