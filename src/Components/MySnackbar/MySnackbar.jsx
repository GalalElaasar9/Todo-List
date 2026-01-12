import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { Alert } from '@mui/material';
import { ToastContext } from '../../Context/ToastContext';

export default function MySnackbar({message}) {
  const {open , setOpen } = useContext(ToastContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert onClose={handleClose} security='success' sx={{ width:"100%" }} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
