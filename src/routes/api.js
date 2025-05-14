const express = require('express');
const router = express.Router();
const HelloController = require('../controllers/HelloController')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController');
const AuthVerification = require('../middleware/AuthVerification');


//  This is my first routing
router.get('/hello', HelloController.Hello)



// Products Routes
router.get('/ProductBrandList', ProductController.ProductBrandList)
router.get('/ProductCategoryList', ProductController.ProductCategoryList)
router.get('/ProductList', ProductController.ProductList)
router.get('/ProductSliderList', ProductController.ProductSliderList)

router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory)
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark)

router.get('/ProductListBySimilar/:CategoryID', ProductController.ProductListBySimilar)
router.get('/ProductListByKeyword/:Keyword', ProductController.ProductListByKeyword)
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList)


// User
router.get('/UserOTP/:email', UserController.UserOTP)
router.get('/VerifyOTP/:email/:otp', UserController.VerifyOTP)
router.get('/UserLogout', AuthVerification ,UserController.UserLogout)

// Profile
router.post('/CreateProfile', AuthVerification ,UserController.CreateProfile)
router.post('/UpdateProfile', AuthVerification ,UserController.UpdateProfile)

module.exports = router;