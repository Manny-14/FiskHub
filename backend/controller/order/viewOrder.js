const orderModel = require("../../models/orderModel")

const viewOrderController = async(req, res) => {
    try {
        const userId = req.userId

        const orderList = await orderModel.find({ userId : userId}).sort({createdAt : -1})

        res.json({
            data : orderList,
            messaage : "Order list",
            success : true,
            error : false
        })
    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = viewOrderController