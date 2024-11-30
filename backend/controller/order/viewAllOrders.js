const orderModel = require("../../models/orderModel")

const viewAllOrdersController = async (req, res) => {
    try {

        const orderList = await orderModel.find().sort({createdAt : -1})

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

module.exports = viewAllOrdersController