const ErrorResponse = require("../utils/errorResponse");
const ProductPricing = require("../models/productPricing");

exports.saveProductPrice = async (req, res, next) => {
  const { productId, value, currencyCode } = req.body;

  // Check if productId is provided
  if (!productId) {
    return next(new ErrorResponse("Please provide a product id", 400));
  }

  // Check if productId is provided
  if (!value) {
    return next(new ErrorResponse("Please provide a price for the product", 400));
  }

  // Check if productId is provided
  if (!currencyCode) {
    return next(new ErrorResponse("Please provide a currency code", 400));
  }

  try {
    const newProductPricing = await ProductPricing.create({ productId, value, currencyCode });
    res.status(200).json({ success: true, price: newProductPricing });
  } catch (err) {
    next(err);
  }
};

exports.saveProductPrices = async (req, res, next) => {
  const { productPrices } = req.body;

  // Check if code is provided
  if (!productPrices) {
    return next(new ErrorResponse("Please provide a list of product prices", 400));
  }

  try {
    const newProductPricings = await ProductPricing.insertMany(productPrices);
    res.status(200).json({ success: true, prices: newProductPricings });
  } catch (err) {
    next(err);
  }
};

exports.getProductPricings = (req, res, next) => {
  ProductPricing.find()
    .then(prices => {
      res.status(200).json({ success: true, pricings: prices, });
    })
    .catch(err => {
      next(err);
    });
};