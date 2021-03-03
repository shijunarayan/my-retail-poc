const ErrorResponse = require("../utils/errorResponse");
const CurrencyCode = require("../models/CurrencyCode");

exports.addCurrencyCode = async (req, res, next) => {
  const { currencyCode } = req.body;

  // Check if code is provided
  if (!currencyCode) {
    return next(new ErrorResponse("Please provide a currencyCode", 400));
  }

  try {
    const newCurrencyCode = await CurrencyCode.create({ currencyCode });
    res.status(200).json({ success: true, currency_code: newCurrencyCode, });
  } catch (err) {
    next(err);
  }
};

exports.addCurrencyCodes = async (req, res, next) => {
  const { currencyCodes } = req.body;

  // Check if code is provided
  if (!currencyCodes) {
    return next(new ErrorResponse("Please provide a list of currencyCodes", 400));
  }

  try {
    const newCurrencyCodes = await CurrencyCode.insertMany(currencyCodes);
    res.status(200).json({ success: true, currency_codes: newCurrencyCodes, });
  } catch (err) {
    next(err);
  }
};

exports.getCurrencyCodes = (req, res, next) => {
  CurrencyCode.find()
    .then(codes => {
      res.status(200).json({ success: true, currency_codes: codes, });
    })
    .catch(err => {
      next(err);
    });
};
