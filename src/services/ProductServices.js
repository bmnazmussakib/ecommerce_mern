const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ReviewModel = require("../models/ReviewModel");


// Get all brands
const ProductBrandListService = async () => {
  try {
    const data = await BrandModel.find({});
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Get all categories
const ProductCategoryListService = async () => {
  try {
    const data = await CategoryModel.find({});
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Get all products
const ProductListService = async () => {
  try {
    const data = await ProductModel.find({});
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Get all product sliders
const ProductSliderListService = async () => {
  try {
    const data = await ProductSliderModel.find({});
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Get products by brand
const ProductListByBrandService = async (req) => {
  try {
    const BrandID = new ObjectId(req.params.BrandID);
    
    const MatchStage = {
      $match: { brandID: BrandID },
    };
    console.log("Received BrandID:", req.params.BrandID);

    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    // Uncomment if category join is needed
    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    const UnwindBrandStage = {
      $unwind: {
        path: "$brand",
        // preserveNullAndEmptyArrays: true
      },
    };

    const UnwindCategoryStage = {
      $unwind: {
        path: "$category",
        // preserveNullAndEmptyArrays: true
      },
    };

    const ProjectoinStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectoinStage,
    ]);

    // const data = await ProductModel.find({ brandID: BrandID });

    const test = await ProductModel.find({ brandID: BrandID });
console.log("Matched Products:", test);


    return { status: "success", data: test };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Placeholder: Get products by category
const ProductListByCategoryService = async (req) => {
  try {
    const CategotyID = new mongoose.Types.ObjectId(req.params.CategoryID);

    const MatchStage = { $match: { categoryID: CategotyID } };
    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    const UnwindBrandStage = {
      $unwind: {
        path: "$brand",
        // preserveNullAndEmptyArrays: true
      },
    };

    const UnwindCategoryStage = {
      $unwind: {
        path: "$category",
        // preserveNullAndEmptyArrays: true
      },
    };

    const ProjectoinStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithCategoryStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectoinStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Placeholder: Get products by remark
const ProductListByRemarkService = async (req) => {
  try {
    const Remark = req.params.Remark;

    const MatchStage = { $match: { remark: Remark } };
    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    const UnwindBrandStage = {
      $unwind: {
        path: "$brand",
        // preserveNullAndEmptyArrays: true
      },
    };

    const UnwindCategoryStage = {
      $unwind: {
        path: "$category",
        // preserveNullAndEmptyArrays: true
      },
    };

    const ProjectoinStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithCategoryStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectoinStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Placeholder: Get similar products
const ProductListBySimilarService = async (req) => {
  try {
    const CategotyID = new mongoose.Types.ObjectId(req.params.CategoryID);

    const LimitStage = { $limit: 5 };
    const MatchStage = { $match: { categoryID: CategotyID } };
    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    const UnwindBrandStage = {
      $unwind: {
        path: "$brand",
        // preserveNullAndEmptyArrays: true
      },
    };

    const UnwindCategoryStage = {
      $unwind: {
        path: "$category",
        // preserveNullAndEmptyArrays: true
      },
    };

    const ProjectoinStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      LimitStage,
      JoinWithCategoryStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectoinStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Placeholder: Get product details
const ProductDetailsService = async (req) => {
  try {
    const ProductID = new mongoose.Types.ObjectId(req.params.ProductID);

    const MatchStage = { $match: { _id: ProductID } };
    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const JoinWithDetailStage = {
      $lookup: {
        from: "productDetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    const UnwindBrandStage = {
      $unwind: {
        path: "$brand",
        // preserveNullAndEmptyArrays: true
      },
    };

    const UnwindCategoryStage = {
      $unwind: {
        path: "$category",
        // preserveNullAndEmptyArrays: true
      },
    };

    const UnwindDetailStage = {
      $unwind: {
        path: "$details",
        // preserveNullAndEmptyArrays: true
      },
    };

    const ProjectoinStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      //   LimitStage,
      JoinWithCategoryStage,
      JoinWithBrandStage,
      JoinWithDetailStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailStage,
      ProjectoinStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
};

// Placeholder: Get products by keyword
const ProductListByKeywordService = async () => { };

// Placeholder: Get product reviews
const ProductReviewListService = async (req) => {
  try {
    const productID = new ObjectId(req.params.productID);
    const MatchStage = { $match: { productID: productID } };

    const JoinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };

    const UnwindProfileStage = {
      $unwind: {
        path: "$profile",
      },
    };

    const ProjectionStage = {$project: {'des': 1, 'rating': 1, 'profile.cus_name': 1, }}

    const data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfileStage,
      UnwindProfileStage,
      ProjectionStage
    ]);

    // const data = await ReviewModel.find({productID: productID});

    return { status: "success", data: data };

  } catch (error) {
    return { status: "failed", data: error };
  }
};

const ProductReviewCreateService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;

    const data = await ReviewModel.create({
      productID: reqBody.productID,
      userID: user_id,
      des: reqBody.des,
      rating: reqBody.rating,
    })

    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", data: error };
  }
}



module.exports = {
  ProductBrandListService,
  ProductCategoryListService,
  ProductListService,
  ProductSliderListService,
  ProductListByBrandService,
  ProductListByCategoryService,
  ProductListBySimilarService,
  ProductListByKeywordService,
  ProductListByRemarkService,
  ProductDetailsService,
  ProductReviewListService,
  ProductReviewCreateService
};
