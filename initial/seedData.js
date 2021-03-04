const mongoose = require("mongoose");
const User = require("../models/User");
const CurrencyCode = require("../models/CurrencyCode");
const ProductPricing = require("../models/ProductPricing");
const currencyCodes = require('./currencyCodes.json');
const productPricing = require('./productPricing.json');

exports.seedUser = async () => {
  const email = 'test@myretail.com';
  const password = 'kjhNK5QVNSiO';
  const user = await User.findOne({ email });
  if (!user) await User.create({
    email,
    password,
  });;
};

exports.seedCountryCodes = async () => {
  const data = await CurrencyCode.find();
  if (data.length === 0) await CurrencyCode.insertMany(currencyCodes);
};

exports.seedProductPricing = async () => {
  const data = await ProductPricing.find();
  if (data.length === 0) await ProductPricing.insertMany(productPricing);
};