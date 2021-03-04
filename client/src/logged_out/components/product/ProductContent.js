import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TablePagination,
  Paper,
  Box,
  withStyles,
} from "@material-ui/core";
import SelfAligningImage from "../../../shared/components/SelfAligningImage";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import { fetchAllProducts } from "../../../api/productsApi";

const styles = theme => ({
  root: { marginTop: theme.spacing(8) },
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
});

const rowsPerPage = 10;

function ProductContent(props) {
  const { selectProducts } = props;
  useEffect(() => {
    selectProducts();
  }, [selectProducts]);

  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(() => {
    fetchAllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [setProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const { classes } = props;

  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (__, page) => {
      setPage(page);
    },
    [setPage]
  );

  const printImageGrid = useCallback(() => {
    if (products.length > 0) {
      return (
        <Box p={1}>
          <Grid container spacing={1}>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <Grid item xs={6} sm={4} md={3} key={post.id}>
                  <SelfAligningImage
                    src={post.lead_image}
                    title={post.name}
                    current_price={post.current_price.value}
                    currency_code={post.current_price.currency_code}
                  />
                </Grid>
              ))}
          </Grid>
        </Box >
      );
    }
    return (
      <Box m={2}>
        <HighlightedInformation>
          Product list is empty
        </HighlightedInformation>
      </Box>
    );
  }, [page, products]);

  return (
    <Paper className={classes.root}>
      {printImageGrid()}
      <TablePagination
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        classes={{
          select: classes.dNone,
          selectIcon: classes.dNone,
          actions: products.length > 0 ? classes.dBlock : classes.dNone,
          caption: products.length > 0 ? classes.dBlock : classes.dNone,
        }}
        labelRowsPerPage=""
      />
    </Paper>
  );
}

ProductContent.propTypes = {
  selectProducts: PropTypes.func.isRequired
};

export default withStyles(styles)(ProductContent);
