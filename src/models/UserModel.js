const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: { type: String, required: true, unique: true, lowercase: true },
    otp:{ type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
