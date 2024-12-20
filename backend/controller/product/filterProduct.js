const productModel = require("../../models/productModel")

const filterProductController = async(req, res) => {
    try {
        const categoryList = req?.body?.category || []

        const product = await productModel.find({
            category : {
                "$in" : categoryList
            }, 
            sold : "false"
        })

        res.json({
            data : product,
            message : "Products retrieved",
            error : false,
            success : true
        })
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = filterProductController