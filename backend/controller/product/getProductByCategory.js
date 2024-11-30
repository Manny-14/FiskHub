const productModel = require("../../models/productModel")

const getProductByCategoryController = async(req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category, sold : "false" })

        res.json({
            data : product,
            message : "Products",
            success : true,
            error : false
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = getProductByCategoryController