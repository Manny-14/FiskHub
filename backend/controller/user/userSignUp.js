const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
// Store hash in your password DB.

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body

        const user = await userModel.findOne({email})
        
        // Check if user already exists
        if(user){
            throw new Error('User already exists')
        }

        // Ensure that all fields are filled
        if(!email){
            throw new Error('Email is required')
        }
        if(!password){
            throw new Error('Password is required')
        }
        if(!name){
            throw new Error('Name is required')
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error('Password hashing failed')
        }

        const payload = {
            ...req.body,
            role : 'USER',
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save() // Check this out

        res.status(201).json({
            message : 'User created successfully',
            error : false,
            success : true,
            data : saveUser
        })

    } catch (error) {
        console.log("error:", error.message)
        res.json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController