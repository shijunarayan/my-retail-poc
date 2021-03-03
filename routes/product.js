const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCurrencyCodes, addCurrencyCode, addCurrencyCodes } = require("../controllers/currencyCode");
const { getProductPricings, saveProductPrice, saveProductPrices, updateProductPrice } = require("../controllers/productPricing");
const {
  getAllProducts,
  getProductByID,
} = require("../controllers/product");


router.route("/getCurrencyCodes").get(getCurrencyCodes);
router.route("/addCurrencyCode").post(addCurrencyCode);
router.route("/addCurrencyCodes").post(addCurrencyCodes);


router.route("/getProductPricings").get(getProductPricings);
router.route("/saveProductPrice").post(saveProductPrice);
router.route("/saveProductPrices").post(saveProductPrices);
router.route("/updateProductPrice/:id").put(updateProductPrice);

router.route("/getProductByID/:id").get(getProductByID);
router.route("/getAllProducts").get(protect, getAllProducts);

module.exports = router;


/*
https://redsky.target.com/v3/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
https://redsky.target.com/v3/pdp/tcin/54456119?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
https://redsky.target.com/v3/pdp/tcin/13264003?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
https://redsky.target.com/v3/pdp/tcin/12954218?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
*/