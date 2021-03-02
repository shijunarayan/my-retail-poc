import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: theme.spacing(12),
  },
  home: {
    marginLeft: 'auto',
  }
});

function NotFound(props) {
  const { history, classes } = props;

  const redirectToHome = () => {
    history.push('/')
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h1" component="h2">
          Oops!
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          404 - PAGE NOT FOUND
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
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

export default withRouter(withStyles(styles)(NotFound));