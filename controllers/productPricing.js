const ErrorResponse = require("../utils/errorResponse");
const ProductPricing = require("../models/productPricing");
const DEFAULT_CURRENCY_CODE = 'USD';

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

exports.getProductPricings = async (next) => {
  try {
    const productPrices = await ProductPricing.find().exec();
    return productPrices;
  } catch (err) {
    next(err);
  }
};

exports.getProductPrice = async (product, next) => {
  try {
    const productPrice = await ProductPricing.findOne({ productId: product.id }).exec();
    if (productPrice) {
      return { "value": productPrice.value, "currency_code": productPrice.currencyCode };
    }
    return { "value": 0, "currency_code": DEFAULT_CURRENCY_CODE };
  } catch (err) {
    next(err);
  }
};

exports.updateProductPrice = (req, res, next) => {
  const { productId, value, currencyCode } = req.body;

  // Check if all inputs are provided
  if (!(productId && value && currencyCode)) {
    return next(new ErrorResponse("Please provide a product id, value, and currency code", 400));
  }

  ProductPricing.updateOne({ productId: productId }, { value: value, currencyCode: currencyCode })
    .then(prices => {
      res.status(204).json({ success: true });
    })
    .catch(err => {
      next(err);
    });
};

exports.bulkUpdateProductPrice = async (req, res, next) => {
  try {
    const { updatedProducts } = req.body;

    // Check if all inputs are provided
    if (!updatedProducts) {
      return next(new ErrorResponse("Please provide a list of products to update", 400));
    }

    for (product of updatedProducts) {
      const newPrice = { value: product.current_price.value, currencyCode: product.current_price.currency_code }
      await ProductPricing.updateOne({ productId: product.id }, newPrice);
    }

    res.status(204).json({ success: true });
  } catch (err) {
    next(err);
  }
};