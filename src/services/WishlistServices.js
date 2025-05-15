const WishModel = require("../models/WishModel");

const WishListService = async (req) => { }

const SaveWishListService = async (req) => {
    try {
        const { email, user_id } = req.headers;
        const reqBody = req.body;
        reqBody.userID = user_id;
        const data = await WishModel.findOneAndUpdate(
            { userID: user_id },         // filter
            reqBody,                     // update
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

const DeleteWishListService = async (req) => { }

module.exports = {
    WishListService,
    SaveWishListService,
    DeleteWishListService
}