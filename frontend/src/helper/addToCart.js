import SummaryApi from "../common"
import { toast } from "react-toastify"

const addToCart = async(e, id, user) => {
    
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.add_to_cart.url, {
        method : SummaryApi.add_to_cart.method,
        credentials : "include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            productId : id
        })
    })

    const responseData = await response.json()

    if(responseData.success) {
        toast.success(responseData.message)
        user.fetchItemsCountInUserCart()
    }

    if(responseData.error) {
        toast.error(responseData.message)
    }

    return responseData
}

export default addToCart