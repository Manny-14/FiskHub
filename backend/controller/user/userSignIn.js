const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if(!email){
            throw new Error('Email is required')
        }
        if(!password){
            throw new Error('Password is required')
        }

        const user = await userModel.findOne({email})

        if(!user) {
            throw new Error('User does not exist')
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(checkPassword) {
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            console.log("is the token in the room with us", token)
            console.log("The user logged in is", user.name)

            const tokenOption = {
                httpOnly : true,
                secure : true,
            }

            res.cookie("token", token, tokenOption).json({
                message : "Login successful",
                data : token,
                success : true,
                error : false
            })
        } else {
            throw new Error('Incorrect password')
        }

    }catch (error) {
        console.log("error:", error.message)
        res.json({
            message : error.message,
            error : true,
            success : false,
        })
    }

}

module.exports = userSignInController