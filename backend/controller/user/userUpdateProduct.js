const productModel = require("../../models/productModel")

const userUpdateProductController = async(req, res) => {
    try {
        const { _id, ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message : "Product updated successfully",
            data : updateProduct,
            success : true,
            error : false,
        })

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userUpdateProductController