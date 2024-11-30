const productModel = require("../../models/productModel")

const searchProductController = async(req, res) => {
    try {
        const query = req.query.q

        const regex = new RegExp(query, 'ig')

        const product = await productModel.find({
            "$and" : [
                {
                    "$or" : [
                        { productName : regex},
                        {category : regex},
                        {posterName : regex},
                    ]
                },
                { sold : "false"}
            ]
        })

        res.json({
            data : product,
            message : "Product List from search",
            error : false,
            success : true
        })
        
        // console.log(query)
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = searchProductController