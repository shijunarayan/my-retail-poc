import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  List, Paper, withStyles,
  Divider,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import ProductTable from "./ProductTable";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => ({
  root: { marginTop: theme.spacing(9) },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  },
  addProduct: {
    marginLeft: "auto"
  }
});

function ProductContent(props) {
  const { openAddProductModal, products, classes } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Fab
          color="secondary"
          variant="extended"
          className={classes.addProduct}
          onClick={openAddProductModal}
          aria-label="add">
          <AddIcon className={classes.extendedIcon} /> Add Products
        </Fab>
      </Toolbar>
      <Divider />
      <List disablePadding>
        <ProductTable products={products} />
      </List>
    </Paper>
  );
}

ProductContent.propTypes = {
  openAddProductModal: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductContent);
