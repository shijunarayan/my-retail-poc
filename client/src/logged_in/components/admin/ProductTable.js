import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
  withStyles
} from "@material-ui/core";
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';


const styles = theme => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  save: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    maxWidth: 300,
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "lead_image",
    numeric: false,
    label: "Lead image"
  },
  {
    id: "name",
    numeric: false,
    label: "Name"
  },
  {
    id: "current_price",
    numeric: false,
    label: "Current Price"
  },
  {
    id: "currency_code",
    numeric: false,
    label: "Currency Code"
  }
];

const rowsPerPage = 10;

function ProductTable(props) {
  const { products, classes } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  if (products.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <div className={classes.save}>
          <Button variant="contained" color="primary" disableElevation>
            Save Changes
          </Button>
        </div>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={products.length} rows={rows} />
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    <Avatar variant="square" alt={`${transaction.name} image`} src={transaction.lead_image} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField id={transaction.id.toString()} defaultValue={transaction.current_price.value} label="Current Price" variant="outlined" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.current_price.currency_code}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: products.length > 0 ? classes.dBlock : classes.dNone,
            caption: products.length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No products received yet.
      </HighlightedInformation>
    </div>
  );
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(ProductTable);
