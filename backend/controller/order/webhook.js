const stripe = require('../../config/stripe')
const cartModel = require('../../models/cart')
const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET


async function getLineItems(lineItems) {
    let productItems = []

    if(lineItems?.data?.length) {
        for(const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId
            const posterEmail = product.metadata.posterEmail

            const productData = {
                productId : productId,
                name : product.name,
                posterEmail : posterEmail,
                price : item.price.unit_amount / 100,
                quantity : 1,
                image : product.images
            }

            productItems.push(productData)

        }
    }

    return productItems
}

const webhookController = async(request, response) => {
    const signature = request.headers['stripe-signature'];

    const payLoadString = JSON.stringify(request.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payLoadString,
        secret: endpointSecret,
      });

    let event = request.body;

    try {
        event = stripe.webhooks.constructEvent(
            payLoadString,
            header,
            endpointSecret
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;


            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)


            const productDetails = await getLineItems(lineItems)

            await Promise.all(productDetails.map(async (product) => {
                console.log("Hi, we arrived here", product)
                const productId = product.productId;
                await productModel.findByIdAndUpdate(productId, { sold: "true" });
            }));

            const orderDetails = {
                productDetails  : productDetails,
                email : session.customer_email,
                userId : session.metadata.userId,
                paymentDetails : {
                    paymentId : session.payment_intent,
                    paymentMethodTypes : session.payment_method_types,
                    payment_status : session.payment_status
                },
                totalAmount : session.amount_total / 100
            }

            const order = new orderModel(orderDetails)
            const saveOrder = await order.save()

            if(saveOrder?._id) {
                const clearCart = await cartModel.deleteMany({ userId : session.metadata.userId})
            }


            break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }

    response.status(200).send();
}

module.exports = webhookController