const mongoose = require("mongoose");
const CurrencyCode = require("../models/CurrencyCode");
const ProductPricing = require("../models/productPricing");
const currencyCodes = require('./currencyCodes.json');
const productPricing = require('./productPricing.json');

exports.seedCountryCodes = async () => {
  const data = await CurrencyCode.find().exec();
  if (data.length === 0) await CurrencyCode.insertMany(currencyCodes);
};

exports.seedProductPricing = async () => {
  const data = await ProductPricing.find().exec();
  if (data.length === 0) await ProductPricing.insertMany(productPricing);
};