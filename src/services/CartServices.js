const { default: mongoose } = require("mongoose");
const CartModel = require("../models/CartModel");
const ObjectId = mongoose.Types.ObjectId;

const CartListService = async (req) => {
    try {

        const userID = new ObjectId(req.headers.user_id);
        const MatchStage = { $match: { userID: userID } }

        const JoinWithProdutStage = {
            $lookup: {
                from: 'products',
                localField: 'productID',
                foreignField: '_id',
                as: 'product'
            }
        }
        const UnwindProductStage = {
            $unwind: {
                path: '$product'
            }
        }

        const JoinWitBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'product.brandID',
                foreignField: '_id',
                as: 'brand'
            }
        }
        const UnwindBrandStage = {
            $unwind: {
                path: '$brand'
            }
        }

        const JoinWitCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'product.categoryID',
                foreignField: '_id',
                as: 'category'
            }
        }
        const UnwindCategoryStage = {
            $unwind: {
                path: '$category'
            }
        }

        const ProjectoinStage = {
            $project: {
                // '_id': 0,
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

        const data = await CartModel.aggregate([
            MatchStage,
            JoinWithProdutStage,
            UnwindProductStage,
            JoinWitBrandStage,
            UnwindBrandStage,
            JoinWitCategoryStage,
            UnwindCategoryStage,
            ProjectoinStage
        ])

        const allData = await CartModel.find({ userID: userID })


        return {
            status: "success",
            message: data
        }
    } catch (error) {
        return {
            status: "fail",
            message: error
        }
    }
}

const SaveCartListService = async (req) => {
    try {
        const userID = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = userID;

        await CartModel.create(reqBody);

        return {
            status: "success",
            message: "cart save success"
        }
    } catch (error) {
        return {
            status: "fail",
            message: error.message
        }
    }
}

const UpdateCartListService = async (req) => { 
    try {
        const userID = req.headers.user_id;
        const cartID = req.params.cartID;
        const reqBody = req.body;

        const data = await CartModel.findOneAndUpdate(
            { _id: cartID, userID: userID },
            { $set: reqBody },
            { new: true }
        );

        return {
            status: "success",
            message: "cart update success",
            data: data
        }
    } catch (error) {
        return {
            status: "fail",
            message: error.message
        }
        
    }
 }

const RemoveCartListService = async (req) => {
    try {
        const userID = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = userID;

        await CartModel.deleteOne(reqBody);
        return {
            status: "success",
            message: "cart delete success"
        }
    } catch (error) {
        return {
            status: "fail",
            message: error.message
        }
    }
}

module.exports = {
    CartListService,
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService
}