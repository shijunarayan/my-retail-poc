const Product = require("../models/Product");
const htmlEntities = require("html-entities");
const initialProducts = require("../initial/products.json");
const axios = require("axios");

const config = {
  header: {
    "Content-Type": "application/json",
  },
};

const getProductByIDFromExternalSource = (productId) => {
  const url = `https://redsky.target.com/v3/pdp/tcin/${productId}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate`;
  return axios.get(
    url,
    config
  );
}

exports.saveInitialProducts = async (req, res, next) => {
  try {
    const product = await Product.insertMany(initialProducts);
    res
      .status(200)
      .json({
        success: true,
        data: product,
      });
  } catch (err) {
    next(err);
  }
};

exports.getProductByID = (req, res, next) => {
  const id = req.params.id;
  Product.findOne({ productId: id })
    .then(product => {
      if (product) {
        res
          .status(200)
          .json({
            success: true,
            product: formatProduct(product),
          });
      } else {
        getProductByIDFromExternalSource(id)
          .then((externalSourceRes) => {
            res
              .status(200)
              .json({
                success: true,
                product: externalSourceRes.data,
              });
          })
          .catch(err => {
            next(err);
          });
      }
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

const formatProduct = (product) => {
  let newProduct = {
    id: product.productId,
    name: htmlEntities.decode(product.name),
    lead_image: product.leadImage,
    current_price: {
      value: product.currentPrice.value,
      currency_code: product.currentPrice.currencyCode,
    },
    is_active: product.isActive
  };

  return newProduct;
}