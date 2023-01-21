const { log } = require("handlebars");
const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  billType: { type: String, default: "Original" },
  dc: {
    ours: { type: String },
    party: { type: String },
  },
  date: { type: Date, default: Date.now },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Beneficiaries" },
  vehicle: { type: String },
  products: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
      rate: { type: Number },
      amount: { type: Number, default: calculateAmount },
    },
  ],
});

function calculateAmount() {
  return this.rate * this.quantity;
}

module.exports = mongoose.model("Bills", billSchema);
