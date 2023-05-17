import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import './forgotPass.css';
import { Button } from '@mui/material';
import { useState, useContext } from 'react';
import axios from 'axios';
import BasicAlerts from '../../components/Alert/BasicAlerts';
import userContext from '../../context/UserContext';
import helperContext from '../../context/HelperContext';
import Timer from '../../components/Timer/Timer'

const ForgotPass = () => {

  const {
    alertRes,
    setAlertRes,
    navigate,
  } = useContext(userContext)

  const {
    setState
  } = useContext(helperContext)


  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [hideSendOtpBtn, setHideSendOtpBtn] = useState(true);
  const [hideVerifyOtpBtn, setHideVerifyOtpBtn] = useState(false);
  const [restPassBtn, setResetPassBtn] = useState(false);
  const [resetPassDetails, setResetPssDetails] = useState({});
  const [showTimer, setShowTimer] = useState(false)

  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  })


  const sendForgotPasswordOTP = async (email) => {
    try {
      const otpResponse = await axios.post(`${process.env.REACT_APP_ENDPOINT}/send/otp`, { email });
      if (otpResponse.status == 200) {
        setShowTimer(true)
        setResetPssDetails(otpResponse.data.userDetails)
        setAlertRes(prev => ({ ...prev, message: otpResponse.data.message, showAlert: true, status: 'success' }))
        console.log("alertRes", alertRes)
        setState(!otpResponse.data.isError);
        setHideSendOtpBtn(false)
        setHideVerifyOtpBtn(true);
        console.log("OTP response", otpResponse)
      }

    } catch (err) {
      console.log(err)
      setAlertRes(prev => ({ ...prev, message: err.response.data.message, showAlert: !err.response.data.isError, status: 'error' }))
    }
  }

  const verifyOTP = async (otp) => {
    console.log('Verify OTP CALLED', )
    try {
      const verifiedOtpDetails = await axios.post(`${process.env.REACT_APP_ENDPOINT}/verify/otp`, { otp })
      console.log("otp details", verifiedOtpDetails)
      if (verifiedOtpDetails.status == 200) {
        setAlertRes(prev => ({ ...prev, message: verifiedOtpDetails.data.message, showAlert: !verifiedOtpDetails.data.isError, status: verifiedOtpDetails.data.status }))
        setState(verifiedOtpDetails.data.isError)
        setResetPassBtn(true);
        setHideVerifyOtpBtn(false)
      }
    }
    catch (err) {
      console.log(err)
      setAlertRes(prev => ({ ...prev, message: err.response.data.message, showAlert: !err.response.data.isError, status: 'error' }))
    }
  }

  const updatePassword = async () => {
    console.log('Reset password called', password.newPassword, password.confirmPassword)
    try{
      const updatedPassword = await axios.post(`${process.env.REACT_APP_ENDPOINT}/forgot/password/${resetPassDetails._id}`,{newPassword: password.newPassword, confirmPassword: password.confirmPassword} )
      console.log('password updated', updatedPassword);
      navigate('/login')
    }catch(err){

    }
  }


  return (
    <div>
      <Toolbar />
      <Box className="forgotPass_container">
        <form>
          {showTimer ? <p style={{display: 'flex', justifyContent: 'center'}}>OTP will be expire in &nbsp;<Timer/></p> : ''}
          <h2>Reset your password</h2>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Enter you email"
            variant="outlined"
            name='fortgotPass'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {alertRes.showAlert ? <TextField
            id="outlined-basic"
            label="Enter OTP"
            variant="outlined"
            name='otp'
            value={otp}
            onChange={e => setOtp(e.target.value)}
          /> : ''}

          {restPassBtn ? <TextField
            id="outlined-basic"
            label="Enter new password"
            variant="outlined"
            name='newPassword'
            value={password.newPassword}
            onChange={e => setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          /> : ''}

          {restPassBtn ? <TextField
            id="outlined-basic"
            label="Confirm new password"
            variant="outlined"
            name='confirmPassword'
            value={password.confirmPassword}
            onChange={e => setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          /> : ''}

          {hideSendOtpBtn ? <Button onClick={() => sendForgotPasswordOTP(email)} variant="contained">Send OTP</Button> : ''}
          {hideVerifyOtpBtn ? <Button onClick={() => verifyOTP(otp)} variant="contained">Verify OTP</Button> : ''}
          {restPassBtn ? <Button onClick={updatePassword} variant="contained">Reset password</Button> : ''}
        </form>
      </Box>
      {alertRes.showAlert && <center><BasicAlerts response={alertRes} /></center>}
    </div>
  )
}

export default ForgotPass