const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
      productId: { type: mongoose.Schema.Type.ObjectId, required: true },
      userId: { type: mongoose.Schema.Type.ObjectId, required: true },
      description: { type: String, required: true },
      rating: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReviewModel = mongoose.model("reviews", DataSchema);
module.exports = ReviewModel;
