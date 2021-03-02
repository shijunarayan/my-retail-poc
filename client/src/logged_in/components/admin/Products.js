import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import ProductContent from "./ProductContent";
import AddProduct from "./AddProduct";
import { fetchProducts } from "../../../api/productsApi";

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
    fetchProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [setProducts]);

  useEffect(() => {
    selectProducts();
    loadProducts();
  }, [selectProducts, loadProducts]);

  if (isAddProductPaperOpen) {
    return <AddProduct
      onClose={closeAddProductModal}
      setProducts={setProducts}
      products={products}
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
