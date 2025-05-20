const FeaturesModel = require("../models/FeaturesModel")

const FeaturesListService = async (req) => {
    try {
        const data = await FeaturesModel.find()
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = {
    FeaturesListService
}