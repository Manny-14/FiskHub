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
   }
}

export default SummaryApi