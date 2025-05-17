const WishModel = require("../models/WishModel");
const mongoose = require("mongoose");

const WishListService = async (req) => {
    try {
        const userID = new mongoose.Types.ObjectId(req.headers.user_id);

        const MatchStage = { $match: { userID: userID } }

        const JoinWithProductStage = {
            $lookup: {
                from: 'products',
                localField: 'productID',
                foreignField: '_id',
                as: 'product'
            }
        }
        const UnwindProductStage = {
            $unwind: {
                path: '$product',
                // preserveNullAndEmptyArrays: true
            }
        }

        const JoinWithBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'product.brandID',
                foreignField: '_id',
                as: 'brand'
            }
        }
        const UnwindBrandStage = {
            $unwind: {
                path: '$brand',
                // preserveNullAndEmptyArrays: true
            }
        }

        const JoinWithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'product.categoryID',
                foreignField: '_id',
                as: 'category'
            }
        }
        const UnwindCategoryStage = {
            $unwind: {
                path: '$category',
                // preserveNullAndEmptyArrays: true
            }
        }

        const ProjectoinStage = {
            $project: {
                '_id': 0,
                'userID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'product._id': 0,
                'brand._id': 0,
                'category._id': 0,
                'product.categoryID': 0,
                'product.brandID': 0,
                'product.createdAt': 0,
                'product.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
            }
        }


        const data = await WishModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStage,
            ProjectoinStage
        ])


        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "failed",
            data: error
        }
    }
}

const SaveWishListService = async (req) => {
    try {
        const { email, user_id } = req.headers;
        const reqBody = req.body;
        reqBody.userID = user_id;

        const data = await WishModel.findOneAndUpdate(
            reqBody,         // filter
            { $set: reqBody },                     // update
            { new: true, upsert: true }  // options
        );
        return {
            status: "wishlist save success",
            data: data
        }
    } catch (error) {
        return {
            status: "wishlist save failed",
            data: error
        }
    }
}

const RemoveWishListService = async (req) => {
    try {
        const reqBody = req.body;
        await WishModel.deleteOne(reqBody);

        return {
            status: "wishlist delete success",
            data: "delete delete success"
        }
    } catch (error) {
        return {
            status: "wishlist delete failed",
            data: error
        }

    }
}

module.exports = {
    WishListService,
    SaveWishListService,
    RemoveWishListService
}