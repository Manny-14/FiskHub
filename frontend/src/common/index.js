const backendDomain = "http://localhost:8080"

const SummaryApi = {
   signUp : {
       url : `${backendDomain}/api/signup`,
       method : 'post'
   }, 
   signin : {
    url : `${backendDomain}/api/signin`,
    method : 'post'
   },
   current_user : {
    url : `${backendDomain}/api/user-details`,
    method : 'get'
   },
   logout_user : {
    url : `${backendDomain}/api/user-logout`,
    method : 'get'
   },
   all_users : {
    url : `${backendDomain}/api/all-users`,
    method : 'get'
   },
   update_user : {
    url : `${backendDomain}/api/update-user`,
    method : 'post'
   },
   upload_product : {
    url : `${backendDomain}/api/upload-product`,
    method : 'post'
   },
   all_products : {
    url : `${backendDomain}/api/get-products`,
    method : 'get'
   },
   update_product : {
    url : `${backendDomain}/api/update-product`,
    method : 'post'
   },
   product_category : {
    url : `${backendDomain}/api/get-product-category`,
    method : 'get'
   },
   product_by_category : {
    url : `${backendDomain}/api/get-product-by-category`,
    method : 'post'
   },
   product_details : {
    url : `${backendDomain}/api/product-details`,
    method : 'post'
   },
   add_to_cart : {
    url : `${backendDomain}/api/add-to-cart`,
    method : 'post'
   },
   items_in_cart_count : {
    url : `${backendDomain}/api/items-in-cart-count`,
    method : 'get'
   },
   view_cart : {
    url : `${backendDomain}/api/view-cart`,
    method : 'get'
   },
   remove_product_from_cart : {
    url : `${backendDomain}/api/remove-product-from-cart`,
    method : 'post'
   },
}

export default SummaryApi