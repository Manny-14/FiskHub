const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

const submitRatingController = async(req, res) => {
    try {
        const data = req.body
        const user = await userModel.findById(req.userId)
        user.productsRated = user.productsRated || {}
        
        await Promise.all(Object.entries(data).map(async([key, value]) => {
            const product = await productModel.findById(key)
            const productId = product._id.toString()
            const seller = await userModel.findById(product.posterId)

            // A lot of bracket but it's just maths to calculate new rating after a new one is submitted
            // There is a bug where user edits a rating, it counts as a new one on submit. 
            // Can be exploited and should be fixed

            if(productId in user.productsRated) {
                console.log("Existing Rating")
                const ratingsReceived = seller.ratingsReceived
                const newRating = (((seller.rating || 0) * (ratingsReceived)) + Number(value) - user.productsRated[productId]) / ratingsReceived
                seller.rating = newRating
                seller.ratingsReceived = ratingsReceived
                user.set(`productsRated.${productId}`, Number(value));
                await seller.save()
            } else {
                console.log("New Rating initialized")
                const ratingsReceived = (seller.ratingsReceived || 0) + 1
                const newRating = (((seller.rating || 0) * (ratingsReceived - 1)) + Number(value)) / ratingsReceived
                seller.rating = newRating
                seller.ratingsReceived = ratingsReceived
                user.set(`productsRated.${productId}`, Number(value));
                await seller.save()
            }
        }))

        await user.save()


        res.status(200).send({
            success : true,
            error : false,
            message : "Ratings Submitted Successfully"
        })
    } catch (error) {
        res.status(500).send({ 
            success: false, 
            error: true,
            message : error.message || error 
        })
    }
}

module.exports = submitRatingController