async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token || req.header

        console.log("token", token) // checking whether or not the token is available
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            data : [],
            error : true,
            success : false
        })
    }
}