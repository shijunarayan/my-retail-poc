const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, "Please provide product id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide product name"],
  },
  leadImage: {
    type: String,
  },
  currentPrice: {
    type: mongoose.Schema.Types.Mixed,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
