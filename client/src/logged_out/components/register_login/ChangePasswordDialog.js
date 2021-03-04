import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import { forgotPassword } from '../../../api/authApi';

const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },
  dialogActions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

function ChangePassword(props) {
  const { onClose, classes, setLoginStatus } = props;
  const [isLoading, setIsLoading] = useState(false);
  const loginEmail = useRef();

  const sendPasswordEmail = useCallback(() => {
    setIsLoading(true);
    forgotPassword(loginEmail.current.value)
      .then(res => {
        setLoginStatus("verificationEmailSend");
        setIsLoading(false);
        onClose();
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
        onClose();
      })
  }, [setIsLoading, setLoginStatus, onClose]);

  return (
    <Dialog
      open
      hideBackdrop
      onClose={onClose}
      disableBackdropClick={isLoading}
      disableEscapeKeyDown={isLoading}
      maxWidth="xs"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPasswordEmail();
        }}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography paragraph>
            Enter your email address below and we will send you instructions on
            how to reset your password.
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Email Address"
            autoFocus
            type="email"
            inputRef={loginEmail}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            Reset password
            {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setLoginStatus: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ChangePassword);
