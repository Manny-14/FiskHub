const express = require('express')
const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogoutController = require('../controller/user/userLogout')
const allUsersController = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductsController = require('../controller/product/getPrducts')
const updateProductController = require('../controller/product/updateProduct')
const getProductCategory = require('../controller/product/getProductCategory')
const getProductByCategoryController = require('../controller/product/getProductByCategory')
const getProductDetailsController = require('../controller/product/getProductDetails')

router.post('/signup', userSignUpController)
router.post('/signin', userSignInController)
router.get('/user-details', authToken, userDetailsController)
router.get('/user-logout', userLogoutController)

// Admin panel
router.get('/all-users', authToken, allUsersController)
router.post('/update-user', authToken, updateUser)

// product
router.post('/upload-product', authToken, UploadProductController)
router.get('/get-products', getProductsController)
router.post('/update-product', authToken, updateProductController)
router.get('/get-product-category', getProductCategory)
router.post('/get-product-by-category', getProductByCategoryController)
router.post('/product-details', getProductDetailsController)


module.exports = router