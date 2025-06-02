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

    // const test = await ProductModel.find({ brandID: BrandID });
    // console.log("Matched Products:", test);


    return { status: "success", data: data };
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
const ProductListByKeywordService = async (req) => {
  try {
    let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" }
    let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }]
    let SearchQuery = { $or: SearchParams }

    let MatchStage = { $match: SearchQuery }

    let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
    let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
    let UnwindBrandStage = { $unwind: "$brand" }
    let UnwindCategoryStage = { $unwind: "$category" }
    let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0 } }

    let data = await ProductModel.aggregate([
      MatchStage, JoinWithBrandStage, JoinWithCategoryStage,
      UnwindBrandStage, UnwindCategoryStage, ProjectionStage
    ])
    return { status: "success", data: data }
  } catch (e) {
    return { status: "fail", data: e }.toString()
  }
};

// Placeholder: Get products by filter
const ProductListByFilterService = async (req) => {
  try {
    const { brandID, categoryID, priceMin, priceMax } = req.body;

    const matchConditions = {};

    // Filter only if brandID is a non-empty string
    if (brandID && brandID !== '') {
      matchConditions['brand._id'] = new mongoose.Types.ObjectId(brandID);
    }

    // Filter only if categoryID is a non-empty string
    if (categoryID && categoryID !== '') {
      matchConditions['category._id'] = new mongoose.Types.ObjectId(categoryID);
    }

    // Convert priceMin and priceMax to numbers only if they're valid
    const min = parseFloat(priceMin);
    const max = parseFloat(priceMax);

    const isMinValid = !isNaN(min) && min > 0;
    const isMaxValid = !isNaN(max) && max > 0;

    if (isMinValid || isMaxValid) {
      matchConditions['price'] = {};
      if (isMinValid) matchConditions['price'].$gte = min;
      if (isMaxValid) matchConditions['price'].$lte = max;
    }

    // Lookup and unwind stages
    const brandLookupStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brand',
      },
    };
    const brandUnwindStage = { $unwind: '$brand' };

    const categoryLookupStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'category',
      },
    };
    const categoryUnwindStage = { $unwind: '$category' };

    // Final match stage
    const matchStage = { $match: matchConditions };

    // Project selected fields
    const projectStage = {
      $project: {
        _id: 1,
        title: 1,
        shortDes: 1,
        price: 1,
        discount: 1,
        discountPrice: 1,
        image: 1,
        star: 1,
        stock: 1,
        remark: 1,
        brand: {
          _id: '$brand._id',
          brandName: '$brand.brandName',
        },
        category: {
          _id: '$category._id',
          categoryName: '$category.categoryName',
        },
      },
    };

    // Run aggregation
    const data = await ProductModel.aggregate([
      brandLookupStage,
      brandUnwindStage,
      categoryLookupStage,
      categoryUnwindStage,
      matchStage,
      projectStage,
    ]);

    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error.toString() };
  }
};


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

    const ProjectionStage = { $project: { 'des': 1, 'rating': 1, 'profile.cus_name': 1, } }

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
  ProductReviewCreateService,
  ProductListByFilterService
};
