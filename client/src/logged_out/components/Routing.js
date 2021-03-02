import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import ProductContent from './product/ProductContent';
import NotFound from '../../shared/components/NotFound';

function Routing(props) {
  const { selectHome, selectProducts } = props;
  return (
    <Switch>
      <PropsRoute exact path="/products" component={ProductContent} selectProducts={selectProducts} />
      <PropsRoute exact path="/" component={Home} selectHome={selectHome} />
      <PropsRoute component={NotFound} />
    </Switch>
  );
}

Routing.propTypes = {
  selectHome: PropTypes.func.isRequired,
  selectProducts: PropTypes.func.isRequired,
};

export default memo(Routing);
