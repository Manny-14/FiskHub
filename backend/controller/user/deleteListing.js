const productModel = require("../../models/productModel")

const deleteListingController = async(req, res) => {
    try {
        const { _id } = req.body

        if(!_id) {
            return res.status(400).json({
                message : "Product Id is required",
                error : true,
                succes : false
            })
        }

        const deleteProduct = await productModel.findByIdAndDelete(_id)

        if (!deleteProduct) {
            return res.status(404).json({
                message : "Product not found",
                error : true,
                success : false
            })
        }

        res.json({
            message : "Product deleted successfully",
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

module.exports = deleteListingController