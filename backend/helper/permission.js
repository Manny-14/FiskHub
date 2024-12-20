const userModel = require("../models/userModel")

const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)

    return user?.role === 'ADMIN'
}

module.exports = uploadProductPermission