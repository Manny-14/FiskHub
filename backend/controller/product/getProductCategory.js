const productModel = require("../../models/productModel")


const getProductCategory = async(req, res) => {
    try {
        const productCategory = await productModel.distinct("category")

        // Array to store one product from each category available
        const productByCategory = []

        for(const category of productCategory) {
            // const product = await productModel.findOne({category})
            // Alternate way to select a random product rather than the first one

            {/** If you ever decide to just use the first object in the category instead
                Make sure to edit the way fetch productCategory handles data in ProductCategoryList.js */}
            const product = await productModel.aggregate([
                { $match: { category, sold: "false" } },
                { $sample: { size: 1 } }
            ]);

            if(product) {
                productByCategory.push(product)
            }


        }

        res.json({
            message : "Product by category retrieved successfully",
            data : productByCategory,
            success : true,
            error : false,
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = getProductCategory