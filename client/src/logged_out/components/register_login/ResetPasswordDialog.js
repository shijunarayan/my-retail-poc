import React, { useState, useCallback, useRef, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import {
  Button,
  withStyles,
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import { resetPassword } from '../../../api/authApi';

const styles = (theme) => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function ResetPasswordDialog(props) {
  const { match, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const newPassword = useRef();
  const newPasswordRepeat = useRef();

  const onClose = useCallback(() => {
    setIsOpen(false);
    history.push('/');
  }, [history]);

  const requestPasswordReset = useCallback(() => {
    setIsLoading(true);
    if (
      newPassword.current.value !== newPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }

    if (newPassword.current.value.length < 6) {
      setStatus("passwordTooShort");
      return;
    }

    resetPassword(match.params.resetToken, newPassword.current.value)
      .then(res => {
        setStatus(null);
        setIsLoading(false);
        onClose();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setStatus, match.params.resetToken, onClose]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open={isOpen}
      headline="Reset Password"
      onFormSubmit={(e) => {
        e.preventDefault();
        requestPasswordReset();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Password"
            inputRef={newPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Repeat Password"
            inputRef={newPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          Reset Password
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

ResetPasswordDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(ResetPasswordDialog));
