const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, default: "General" },
  hsn: { type: Number, required: true },
  tax: { type: Number, default: 9 },
  rate: { type: Number, default: 0 },
});

module.exports = mongoose.model("Products", productSchema);
