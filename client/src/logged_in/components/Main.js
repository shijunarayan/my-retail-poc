import React, { memo, useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const selectProducts = useCallback(() => {
    smoothScrollTop();
    document.title = "MyRetail - Products";
    setSelectedTab("Products");
  }, [setSelectedTab]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  return (
    localStorage.getItem("authToken") ? <Fragment>
      <NavBar
        selectedTab={selectedTab}
        messages={messages}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectProducts={selectProducts}
        />
      </main>
    </Fragment>
      :
      <Routing />
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
