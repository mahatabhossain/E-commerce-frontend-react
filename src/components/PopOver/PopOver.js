import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import helperContext from '../../context/HelperContext';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function PopOver({ onUpdate }) {
  const [otp, setOtp] = useState('');

  const {
    anchorEl,
    open,
    id,
    handlePopupClose,
  } = useContext(helperContext);


  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopupClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <TextField 
          name='otp' 
          value={otp} 
          onChange={(e) => { setOtp(e.target.value) }} 
          id="outlined-basic" label="Enter OTP" 
          variant="outlined" 
          />
          <Stack spacing={2} style={{ margin: '5px' }}>
            <Button onClick={() => onUpdate('update/user', otp)} variant='contained'>Validate OTP</Button>
          </Stack>
        </Typography>
      </Popover>
    </div>
  );
}