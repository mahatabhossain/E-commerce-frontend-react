import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import BasicAlerts from '../../components/Alert/BasicAlerts'
import helperContext from '../../context/HelperContext'
import userContext from '../../context/UserContext'

const VendorSignup = () => {

    //USER CONTEX
    const {
        loading,
        showPassword,
        alertRes,
        signUpData,
        setSignUpData, 
        handleClickShowPassword,
        handleMouseDownPassword,
        onVendorSignUp,
    } = useContext(userContext)

    //HELPER CONTEXT
    const {handleClick} = useContext(helperContext)

  return (
    <div>
    <div className='form_container'>
        <form>
            <h2>Vendor sign up</h2>
            <h4>Already have an account <Link to='/login'>Sign in</Link></h4>
            <TextField id="outlined-basic" label="First name" variant="outlined"
                name='firstName'
                value={signUpData.firstName}
                onChange={e => setSignUpData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <TextField id="outlined-basic" label="Last name" variant="outlined"
                name='lastName'
                value={signUpData.lastName}
                onChange={e => { setSignUpData(prev => ({ ...prev, [e.target.name]: e.target.value })) }}
            />

            <TextField id="outlined-basic" label="email" variant="outlined"
                name='email'
                value={signUpData.email}
                onChange={e => { setSignUpData(prev => ({ ...prev, [e.target.name]: e.target.value })) }}
            />

            <TextField id="outlined-basic" label="Password" variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={signUpData.password}
                onChange={e => { setSignUpData(prev => ({ ...prev, [e.target.name]: e.target.value })) }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }} />
            <p><Link to=''>terms & conditions</Link></p>
            <LoadingButton loading={loading} onClick={() => {onVendorSignUp(); handleClick()}} variant="contained">
                Sing up
            </LoadingButton>

        </form>
    </div>
        {alertRes.showAlert && <center><BasicAlerts response = {alertRes}/></center>}
</div>
  )
}

export default VendorSignup