const productModel = require("../../models/productModel")


async function userUploadProductController(req, res) {
    try {
        const userId = req?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID not found",
                error: true,
                success: false,
            });
        }

        console.log(req.body)

        const productData = {
            ...req.body,
            posterId : userId,
        }
        console.log(productData)

        const uploadProduct = new productModel(productData)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product uploaded successfully",
            error : false,
            success : true,
            data : saveProduct,
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userUploadProductController