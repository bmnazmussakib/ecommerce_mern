const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    cus_add: { type: String, required: true },
    cus_city: { type: String, required: true },
    cus_country: { type: String, required: true },
    cus_fax: { type: String, required: true },
    cus_name: { type: String, required: true },
    cus_phone: { type: String, required: true },
    cus_postCode: { type: String, required: true },
    cus_state: { type: String, required: true },
    
    ship_add: { type: String, required: true },
    ship_city: { type: String, required: true },
    ship_country: { type: String, required: true },
    ship_fax: { type: String, required: true },
    ship_name: { type: String, required: true },
    ship_phone: { type: String, required: true },
    ship_postCode: { type: String, required: true },
    ship_state: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProfileModel = mongoose.model("profiles", DataSchema);
module.exports = ProfileModel;
