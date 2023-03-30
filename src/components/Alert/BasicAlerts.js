import React, {useContext} from 'react';
import Snackbar from '@mui/material/Snackbar';
import helperContext from '../../context/HelperContext';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';

export default function BasicAlerts({response}) {

const { 
  state,
  handleClose,
} = useContext(helperContext)

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state}
        onClose={handleClose}
        message={response.message}
        autoHideDuration={3000}
        ContentProps={{sx: {backgroundColor: response.status }}}
        />
    </div>
  );
}