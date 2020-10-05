import Snackbar from "@material-ui/core/Snackbar";
import React from 'react';
import Alert from "../alert";

const ErrorBar = ({openErrorBar, setOpenErrorBar, errorMessage}) => {
  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorBar(false);
  };

  return (
    <Snackbar
        open={openErrorBar}
        autoHideDuration={6000}
        onClose={handleCloseBar}>
        <Alert onClose={handleCloseBar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
  )
}

export default ErrorBar;
