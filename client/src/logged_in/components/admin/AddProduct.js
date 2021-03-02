import React, { Fragment, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Button,
  Box,
  Divider,
  Paper,
  TextField,
  Toolbar,
  withStyles,

} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import ProductTable from "./ProductTable";

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
  const {
    pushMessageToSnackbar,
    onClose,
    classes, products,
  } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <TextField
          variant="filled"
          className={classes.input}
          placeholder="Enter Product ID(s)"
          inputProps={{ 'aria-label': 'enter product id' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} onClick={onClose} aria-label="directions">
          <CancelIcon />
        </IconButton>
      </Toolbar>
      <ProductTable products={products} />
    </Paper>
  );
}

AddPost.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPost);
