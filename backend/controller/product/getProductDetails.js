const productModel = require("../../models/productModel")
const userModel = require("../../models/userModel")

const getProductDetailsController = async(req, res) => {
    try {
        const { productId } = req.body
        
        const product = await productModel.findById(productId).lean()

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        const user = await userModel.findById(product.posterId)
        const rating = user?.rating || 0
        
        const data = {
            ...product,
            posterRating : Number(rating.toFixed(1))
        }

        res.json({
            data : data,
            message : "Product Retrieved",
            success : true,
            error : false
        })
    } catch (error) {
        console.error("Error retrieving product details:", error);
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetailsController