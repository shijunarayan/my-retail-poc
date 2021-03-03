const mongoose = require("mongoose");

const CurrencyCodeSchema = new mongoose.Schema({
  currencyCode: {
    type: mongoose.Schema.Types.Mixed,
    unique: true
  }
});

const CurrencyCode = mongoose.model("CurrencyCode", CurrencyCodeSchema);

module.exports = CurrencyCode;
