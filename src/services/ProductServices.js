const BrandModel = require('../models/BrandModel')
const CategoryModel = require('../models/CategoryModel')
const ProductModel = require('../models/ProductModel')
const ProductDetailModel = require('../models/ProductDetailModel')
const ProductSliderModel = require('../models/ProductSliderModel')
const ReviewModel = require('../models/ReviewModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const ProductBrandListService = async () => {
    try {
        const data = await BrandModel.find({})
        return { status: "success", data: data }
    } catch (error) {
        return { status: "failed", data: error }
    }
}
const ProductCategoryListService = async () => {
    try {
        const data = await CategoryModel.find({})
        return { status: "success", data: data }
    } catch (error) {
        return { status: "failed", data: error }
    }
}
const ProductSliderListService = async () => {
    try {
        const data = await ProductSliderModel.find({})
        return { status: "success", data: data }
    } catch (error) {
        return { status: "failed", data: error }
    }
}
const ProductListByBrandService = async (req) => {
    
    try {
        const BrandID = new ObjectId(req.params.BrandID);

        const MatchStage = {
            $match: {
                brandId: BrandID
            }
        }

        const JoinWithBrandStage = {
            $lookup: {
                from:'brands',
                localField: 'brandId',
                foreignField: '_id',
                as: 'brands'
            }
        }

        // const JoinWithCategoryStage = {
        //     $lookup: {
        //         from: 'categories',
        //         localField: 'categoryId',
        //         foreignField: '_id',
        //         as: 'categories'
        //     }
        // }

        // const data  = await ProductModel.aggregate([
        //     MatchStage,
        //     JoinWithBrandStage,
        //     JoinWithCategoryStage
        // ])

        // const data  = await BrandModel.find({ _id: req.params.BrandID })
        const data  = await ProductModel.find({ brandId: BrandID })

        return { status: "success", data: data }
    } catch (error) {
        return { status: "failed", data: error }
    }

}
const ProductListByCategoryService = async () => {

}
const ProductListBySimilarService = async () => {

}
const ProductListByKeywordService = async () => {

}
const ProductListByRemarkService = async () => {

}
const ProductDetailsService = async () => {

}
const ProductReviewListService = async () => {

}

module.exports = {
    ProductBrandListService,
    ProductCategoryListService,
    ProductSliderListService,
    ProductListByBrandService,
    ProductListByCategoryService,
    ProductListBySimilarService,
    ProductListByKeywordService,
    ProductListByRemarkService,
    ProductDetailsService,
    ProductReviewListService
}