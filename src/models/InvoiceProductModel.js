const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    
      userId: { type: mongoose.Schema.Type.ObjectId, required: true },
      invoiceId: { type: mongoose.Schema.Type.ObjectId, required: true },
      productId: { type: mongoose.Schema.Type.ObjectId, required: true },
      qty: { type: String, required: true },
      price: { type: String, required: true },
      color: { type: String, required: true },
      size: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InvoiceProductModel = mongoose.model("invoiceProducts", DataSchema);
module.exports = InvoiceProductModel;
