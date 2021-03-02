import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(12),
  },
  home: {
    marginLeft: 'auto',
  }
});

function NotAuthenticated(props) {
  const { history, classes } = props;

  const redirectToHome = () => {
    history.push('/')
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h4" color="error">
          Access Restricted
        </Typography>
        <Typography gutterBottom color="textSecondary">
          Please login to your account to access this page.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" className={classes.home} onClick={redirectToHome}>
          Go To Homepage
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(withStyles(styles)(NotAuthenticated));