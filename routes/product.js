const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCurrencyCodes, addCurrencyCode, addCurrencyCodes } = require("../controllers/currencyCode");
const { saveProductPrice, saveProductPrices, updateProductPrice, bulkUpdateProductPrice } = require("../controllers/productPricing");
const {
  getAllProducts,
  getProductByID,
} = require("../controllers/product");


router.route("/getCurrencyCodes").get(getCurrencyCodes);
router.route("/addCurrencyCode").post(protect, addCurrencyCode);
router.route("/addCurrencyCodes").post(protect, addCurrencyCodes);

router.route("/saveProductPrice").post(protect, saveProductPrice);
router.route("/saveProductPrices").post(protect, saveProductPrices);
router.route("/updateProductPrice/:id").put(protect, updateProductPrice);
router.route("/bulkUpdateProductPrice").post(protect, bulkUpdateProductPrice);


router.route("/getProductByID/:id").get(getProductByID);
router.route("/getAllProducts").get(getAllProducts);

module.exports = router;