const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  gstin: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: {
    line1: { type: String },
    line2: { type: String },
    line3: { type: String },
    pincode: { type: String },
  },
});

module.exports = mongoose.model("Beneficiaries", beneficiarySchema);
