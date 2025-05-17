const express = require('express');
const router = express.Router();
const HelloController = require('../controllers/HelloController')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController');
const WishController = require('../controllers/WishlistController');
const CartController = require('../controllers/CartController');
const AuthVerification = require('../middleware/AuthVerification');


//  This is my first routing
router.get('/hello', HelloController.Hello)



// Products Routes
router.get('/ProductBrandList', AuthVerification , ProductController.ProductBrandList)
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
router.post('/CreateProfile', AuthVerification ,UserController.SaveProfile)
router.post('/UpdateProfile', AuthVerification ,UserController.SaveProfile)
router.get('/ReadProfile', AuthVerification ,UserController.ReadProfile)

// Wish
router.get('/WishList', AuthVerification ,WishController.WishList)
router.post('/SaveWishList', AuthVerification ,WishController.SaveWishList)
router.delete('/RemoveWishList', AuthVerification ,WishController.RemoveWishList)

// Cart
router.get('/CartList', AuthVerification ,CartController.CartList)
router.post('/SaveCartList', AuthVerification ,CartController.SaveCartList)
router.put('/UpdateCartList/:cartID', AuthVerification ,CartController.UpdateCartList)
router.delete('/RemoveCartList', AuthVerification ,CartController.RemoveCartList)




router.get("/protected", AuthVerification, (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
});


module.exports = router;