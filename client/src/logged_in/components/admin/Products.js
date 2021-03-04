import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import ProductContent from "./ProductContent";
import AddProduct from "./AddProduct";
import { fetchAllProducts } from "../../../api/productsApi";

function Products(props) {
  const {
    selectProducts,
    pushMessageToSnackbar,
  } = props;

  const [isAddProductPaperOpen, setIsAddProductPaperOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const openAddProductModal = useCallback(() => {
    setIsAddProductPaperOpen(true);
  }, [setIsAddProductPaperOpen]);

  const closeAddProductModal = useCallback(() => {
    setIsAddProductPaperOpen(false);
  }, [setIsAddProductPaperOpen]);

  const loadProducts = useCallback(() => {
    fetchAllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          pushMessageToSnackbar({
            text: err.response.data.error,
          });
        } else {
          pushMessageToSnackbar({
            text: 'Request failed: please validate your input',
          });
        }
      });
  }, [setProducts, pushMessageToSnackbar]);

  useEffect(() => {
    selectProducts();
    loadProducts();
  }, [selectProducts, loadProducts]);

  if (isAddProductPaperOpen) {
    return <AddProduct
      onClose={closeAddProductModal}
      loadProducts={loadProducts}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <ProductContent
    openAddProductModal={openAddProductModal}
    products={products}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Products.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  selectProducts: PropTypes.func.isRequired,
};

export default Products;
