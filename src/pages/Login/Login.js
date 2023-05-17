import React, { useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import './login.css'
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import userContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    loading,
    navigate,
    showPassword,
    loginCreds,
    setLoginCreds,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClickLogin,
  } = useContext(userContext);

  useEffect(() => {
    return () => {
      if (localStorage.getItem('token')) navigate('/')
    }
  }, [])

  return (
    <div className='login_parent'>
      <div className='form_container'>
        <form>
          <h2>Sign in</h2>
          <h4>Don't have account <Link to='/sign_up'>Sign up</Link></h4>
          <TextField id="outlined-basic" label="Email" variant="outlined"
            name='email'
            value={loginCreds.email}
            onChange={e => setLoginCreds(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />

          <TextField id="outlined-basic" label="Password" variant="outlined"
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={loginCreds.password}
            onChange={e => { setLoginCreds(prev => ({ ...prev, [e.target.name]: e.target.value })) }}
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

          <p><Link to='/forgot/password'>Forgot password</Link></p>
          <LoadingButton loading={loading} onClick={handleClickLogin} variant="contained">
            Login
          </LoadingButton>
        </form>
      </div>
 
    </div>
  )
}

export default Login
