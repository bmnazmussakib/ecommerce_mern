const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
      productId: { type: mongoose.Schema.Type.ObjectId, required: true },
      userId: { type: mongoose.Schema.Type.ObjectId, required: true },
      title: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WishModel = mongoose.model("wishes", DataSchema);
module.exports = WishModel;
