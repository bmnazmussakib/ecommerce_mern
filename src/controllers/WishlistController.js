const { SaveWishListService, DeleteWishListService, WishListService } = require("../services/WishlistServices")

exports.WishList = async (req, res) => {
    const result = await WishListService(req)
    return res.status(200).json(result)
}

exports.SaveWishList = async (req, res) => {
    const result = await SaveWishListService(req)
    return res.status(200).json(result)
}

exports.DeleteWishList = async (req, res) => {
    const result = await DeleteWishListService(req)
    return res.status(200).json(result)
}