const Product = require("../models/Product");
const { getProductPrice } = require("../controllers/productPricing");
const ErrorResponse = require("../utils/errorResponse");
const htmlEntities = require("html-entities");
const axios = require("axios");

const config = {
  header: {
    "Content-Type": "application/json",
  },
};

const getProductByIDFromRedsky = (productId) => {
  const url = `https://redsky.target.com/v3/pdp/tcin/${productId}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate`;
  return axios.get(
    url,
    config
  );
}

exports.getProductByID = (req, res, next) => {
  const id = req.params.id;
  let product = {};

  getProductByIDFromRedsky(id)
    .then((redskyRes) => {
      product = formatProduct(redskyRes.data, next);
    })
    .then(async () => {
      const price = await getProductPrice(product, next);
      console.log('Price', price)
      product.current_price = price;
      res.status(200).json({ success: true, product: product });
    })
    .catch(err => {
      next(err);
    });
};

exports.getActiveProducts = (req, res, next) => {
  Product.find({ isActive: true })
    .then(products => {
      sendProducts(products, 200, res);
    })
    .catch(err => {
      next(err);
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      sendProducts(products, 200, res);
    })
    .catch(err => {
      next(err);
    });
};

const sendProducts = (products, statusCode, res) => {
  let items = products.map((product) => {
    return formatProduct(product);
  });

  res.status(statusCode).json({ success: true, products: items });
}

const formatProduct = (data, next) => {

  if (
    !(data
      && data.product
      && data.product.available_to_promise_network
      && data.product.available_to_promise_network.product_id
      && data.product.item
      && data.product.item.product_description
      && data.product.item.product_description.title)
  ) {
    return next(new ErrorResponse("Unknown product schema", 400));
  }

  let lead_image = '';

  if (data.product.item.enrichment
    && data.product.item.enrichment.images
    && data.product.item.enrichment.images.length > 0
    && data.product.item.enrichment.images[0].base_url
    && data.product.item.enrichment.images[0].primary
  ) {
    lead_image = `${data.product.item.enrichment.images[0].base_url}${data.product.item.enrichment.images[0].primary}`;
  }

  let newProduct = {
    id: data.product.available_to_promise_network.product_id,
    name: htmlEntities.decode(data.product.item.product_description.title),
    lead_image: lead_image,
  };

  return newProduct;
}