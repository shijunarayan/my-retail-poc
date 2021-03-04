import React, { useState, useEffect, useRef } from "react";
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
    classes,
  } = props;

  const productIDs = useRef();

  const searchProduct = () => {
    getProductByID(productIDs.current.value)
      .then(res => {
        let newProductList = [...products, res.data.product];
        setProducts(newProductList)
        if (res.data.product.current_price.value <= 0) {
          setIsNewProduct(true);
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (updatedProducts.length > 0) {
      console.log(`updatedProducts`, updatedProducts);
      bulkUpdateProductPrice(updatedProducts)
        .then(res => {
          console.log(res.status);
          onClose()
        });
    }
  }, [updatedProducts, onClose]);

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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPost);
