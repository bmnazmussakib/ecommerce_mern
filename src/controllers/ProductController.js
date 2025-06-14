const {
    ProductBrandListService,
    ProductCategoryListService,
    ProductSliderListService,
    ProductListByBrandService,
    ProductListByCategoryService,
    ProductListBySimilarService,
    ProductListByKeywordService,
    ProductListByRemarkService,
    ProductDetailsService,
    ProductReviewListService,
    ProductListService,
    ProductReviewCreateService,
    ProductListByFilterService
} = require("../services/ProductServices")




exports.ProductBrandList = async (req, res) => {
    const result = await ProductBrandListService()
    return res.status(200).json(result)
};


exports.ProductCategoryList = async (req, res) => {
    const result = await ProductCategoryListService()
    return res.status(200).json(result)
}

exports.ProductList = async (req, res) => {
    const result = await ProductListService()
    return res.status(200).json(result)
}

exports.ProductSliderList = async (req, res) => {
    const result = await ProductSliderListService()
    return res.status(200).json(result)
}

exports.ProductListByBrand = async (req, res) => {
    const result = await ProductListByBrandService(req)
    return res.status(200).json(result)
}

exports.ProductListByCategory = async (req, res) => {
    const result = await ProductListByCategoryService(req)
    return res.status(200).json(result)
}

exports.ProductListByRemark = async (req, res) => {
    const result = await ProductListByRemarkService(req)
    return res.status(200).json(result)
}

exports.ProductListBySimilar = async (req, res) => {
    const result = await ProductListBySimilarService(req)
    return res.status(200).json(result)
}

exports.ProductDetails = async (req, res) => {
    const result = await ProductDetailsService(req)
    return res.status(200).json(result)
}

exports.ProductListByKeyword = async (req, res) => {
    const result = await ProductListByKeywordService(req)
    return res.status(200).json(result)
}

exports.ProductListByFilter = async (req, res) => {
    const result = await ProductListByFilterService(req)
    return res.status(200).json(result)
}


exports.ProductReviewList = async (req, res) => {
    const result = await ProductReviewListService(req)
    return res.status(200).json(result)
}

exports.CreateProductReview = async (req, res) => {
    const result = await ProductReviewCreateService(req)
    return res.status(200).json(result)
}

