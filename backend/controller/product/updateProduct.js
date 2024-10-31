const uploadProductPermission = require("../helper/permission")
const productModel = require("../models/productModel")

async function updateProductController (req, res) {
    try {
        const userSession = req.userId 

        if(!uploadProductPermission(userSession)) {
            throw new Error("Permission Denied")
        }

        const { _id, ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message : "Product updated successfully",
            data : updateProduct,
            success : true,
            error : false,
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = updateProductController