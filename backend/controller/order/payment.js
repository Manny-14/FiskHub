const stripe = require('../../config/stripe')
const productModel = require('../../models/productModel')
const userModel = require('../../models/userModel')

async function getProductDetails(id) {
    const product = await productModel.findOne({ _id : id})
    const user = await userModel.findOne({_id : product.posterId})
    return user
}

const paymentController = async(req, res) => {
    try {
        const { cartItems } = req.body

        const user = await userModel.findOne({ _id : req.userId })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            // might opt to take shipping out since all products will be delivered to mailroom
            customer_email : user.email,
            metadata : {
                userId : req.userId
            },
            line_items : await Promise.all(cartItems.map(async(items, index) => {
                const poster = await getProductDetails(items.productId._id)
                return {
                    price_data : {
                        currency : 'usd',
                        product_data : {
                            name : items.productId.productName,
                            images : items.productId.productImage,
                            metadata : {
                                productId : items.productId._id,
                                posterEmail : poster.email || "Unknown poster"
                            }
                        },
                        unit_amount : parseInt(items.productId.price * 100)
                    },
                    // Also excluded adjustable quantity since I am not using that.
                    // Idk if it's a compulsory field
                    quantity : 1,
                }

            })),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/order-canceled`
        }

        const session = await stripe.checkout.sessions.create(params)

        res.status(303).json(session)

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = paymentController