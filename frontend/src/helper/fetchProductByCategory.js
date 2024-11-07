import SummaryApi from "../common"

const fetchProductByCategory = async(category) => {
    const response = await fetch(SummaryApi.product_by_category.url, {
        method : SummaryApi.product_by_category.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchProductByCategory