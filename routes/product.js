const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getAllProducts,
  getProductByID,
  saveInitialProducts,
  getActiveProducts
} = require("../controllers/product");

router.route("/getProductByID/:id").get(getProductByID);
router.route("/saveInitialProducts").get(saveInitialProducts);
router.route("/getActiveProducts").get(getActiveProducts);
router.route("/getAllProducts").get(protect, getAllProducts);

module.exports = router;


/*
https://redsky.target.com/v3/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
https://redsky.target.com/v3/pdp/tcin/54456119?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
https://redsky.target.com/v3/pdp/tcin/13264003?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
https://redsky.target.com/v3/pdp/tcin/12954218?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
*/