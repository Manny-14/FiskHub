const userModel = require("../../models/userModel")

const updateUserProfileController = async(req, res) => {
    try {
        const userId = req.userId

        const { userName, userEmail, profilePicture } = req.body

        const payload = {
            ...(userName && { name : userName }),
            ...(userEmail && { email : userEmail }),
            ...(profilePicture && { profilePic : profilePicture }),
        }
        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data : updateUser,
            message : "Profile updated successfully",
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

module.exports = updateUserProfileController