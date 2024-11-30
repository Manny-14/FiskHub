const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const forgotPasswordController = async(req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email : email})
        if(!user){
            throw new Error("User not found")
        }

        const tokenData = {
            _id : user._id,
            email : user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
        });

        var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = forgotPasswordController