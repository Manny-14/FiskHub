const productModel = require("../../models/productModel");

const getListingsController = async(req, res) => {
    try {
        const user = req?.userId


        if(!user) {
            return res.json({
                message : "Please login",
                error : true,
                success : false
            })
        }
        const products = await productModel.find({
            posterId : user
        }).sort({ createdAt : -1 })

        res.json({
            data : products,
            message : "Products retrieved successfully",
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

module.exports = getListingsController