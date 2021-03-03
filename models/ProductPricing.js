const mongoose = require("mongoose");
const CurrencyCode = require("../models/CurrencyCode");

const ProductPricingSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, "Please provide product id"],
    unique: true,
  },
  value: {
    type: Number,
    required: [true, "Please provide an amount value"],
  },
  currencyCode: {
    type: String,
    required: [true, "Please provide a currency code"],
  }
});

ProductPricingSchema.pre("save", function (next) {
  var me = this;
  CurrencyCode.findOne({ "currencyCode.code": me.currencyCode }, (err, code) => {
    (code ? next() : next(new Error('invalid currency code')));
  });
});

ProductPricingSchema.pre("updateOne", function (next) {
  var me = this;
  CurrencyCode.findOne({ "currencyCode.code": me.getUpdate().currencyCode }, (err, code) => {
    (code ? next() : next(new Error('invalid currency code')));
  });
});

const ProductPricing = mongoose.model("ProductPricing", ProductPricingSchema);

module.exports = ProductPricing;
