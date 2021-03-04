import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../shared/components/PrivateRoute";
import Products from './admin/Products';
import NotFound from '../../shared/components/NotFound';

function Routing(props) {
  const { selectProducts, pushMessageToSnackbar } = props;
  return (
    <Switch>
      <PrivateRoute exact path="/admin/products" component={Products} selectProducts={selectProducts} pushMessageToSnackbar={pushMessageToSnackbar} />
      <PrivateRoute component={NotFound} />
    </Switch>
  );
}

Routing.propTypes = {
  selectProducts: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default memo(Routing);
