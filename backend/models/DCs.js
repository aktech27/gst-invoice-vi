const mongoose = require("mongoose");

const dcSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  dc: { type: String },
  date: { type: Date, default: Date.now },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Beneficiaries" },
  vehicle: { type: String },
  products: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
      value: { type: Number },
    },
  ],
});

module.exports = mongoose.model("DCs", dcSchema);
