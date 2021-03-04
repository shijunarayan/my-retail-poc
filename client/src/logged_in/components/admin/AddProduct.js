import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Divider,
  Paper,
  TextField,
  Toolbar,
  withStyles,

} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import ProductTable from "./ProductTable";
import { getProductByID, bulkUpdateProductPrice } from "../../../api/productsApi";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(9)
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});

function AddPost(props) {
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const {
    onClose,
    loadProducts,
    classes,
    pushMessageToSnackbar,
  } = props;

  const productIDs = useRef();

  const searchProduct = useCallback(() => {
    getProductByID(productIDs.current.value)
      .then(res => {
        let newProductList = [...products.filter(p => p.id !== res.data.product.id), res.data.product];
        setProducts(newProductList)
        if (res.data.product.current_price.value <= 0) {
          setIsNewProduct(true);
        } else {
          pushMessageToSnackbar({
            text: 'Found existing product',
          });
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          pushMessageToSnackbar({
            text: err.response.data.error,
          });
        } else {
          console.log(err)
        }
      });
  }, [products, pushMessageToSnackbar]);

  useEffect(() => {
    if (updatedProducts.length > 0) {
      bulkUpdateProductPrice(updatedProducts)
        .then(res => {
          loadProducts();
          onClose();
        });
    }
  }, [updatedProducts, onClose, loadProducts]);

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <TextField
          variant="filled"
          className={classes.input}
          inputRef={productIDs}
          type="number"
          placeholder="Enter a Product ID"
          inputProps={{ 'aria-label': 'enter product id' }}
        />
        <IconButton type="button" onClick={searchProduct} className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} onClick={onClose} aria-label="directions">
          <CancelIcon />
        </IconButton>
      </Toolbar>
      <ProductTable products={products} setUpdatedProducts={setUpdatedProducts} isNewProduct={isNewProduct} />
    </Paper>
  );
}

AddPost.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  loadProducts: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPost);
