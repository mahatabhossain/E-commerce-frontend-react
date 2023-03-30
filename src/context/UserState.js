import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from './UserContext'

const UserState = ({ children }) => {

  const navigate = useNavigate();
  const [loginResponse, setLoginRes] = useState({});
  const [profileData, setProfileData] = useState({})

  //COMMON STATES
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertRes, setAlertRes] = useState({
    status: '',
    message: '',
    showAlert: false
  })

  // LOGIN STATES
  const [loginCreds, setLoginCreds] = useState({
    email: '',
    password: '',
  });

  //SIGN UP STATES
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  // COMMON FUNCTIONS
  const handleClickShowPassword = () => setShowPassword(prev => !prev)
  const handleMouseDownPassword = (event) => event.preventDefault();
  const alertDelay = () => {
    setTimeout(() => {
      setAlertRes(prev => ({ ...prev, showAlert: false }))
    }, 2000);
  }

  //SIGN UP FUNCTIONS(USER)
  const onHandleSignUp = async () => {
    setLoading(true);
    let signUpCreds;
    try {
      signUpCreds = await axios.post(`${process.env.REACT_APP_ENDPOINT}/create/user`, signUpData);
      console.log(signUpCreds);
      if (signUpCreds.status == 200) {
        setAlertRes(prev => ({ ...prev, showAlert: true, message: signUpCreds.data.status, status: 'success' }))
      }
      setSignUpData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      setLoading(false)
      alertDelay()
      navigate('/login');
    } catch (e) {
      setAlertRes(prev => ({ ...prev, showAlert: true, message: e.response.data.message, status: 'error' }))
    }
  }

  //SIGN UP FUNCTIONS(VENDOR)
  const onVendorSignUp = async () => {
    try {
      setLoading(true)
      const vendorSignupDetails = await axios.post(`${process.env.REACT_APP_ENDPOINT}/vendor/signup`, signUpData);
      console.log(vendorSignupDetails)
      if (vendorSignupDetails.status == 200) {
        setAlertRes(prev => ({ ...prev, showAlert: true, message: vendorSignupDetails.data.message, status: 'success' }))
      }
      setSignUpData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      setLoading(false)

    } catch (e) {
      setAlertRes(prev => ({ ...prev, showAlert: true, message: e.response.data.message, status: 'error' }))
      setLoading(false)
    }
  }

  // LOGOIN FUNCTIONS
  const handleClickLogin = async () => {
    setLoading(true)
    try {
      let loginRes = await axios.post(`${process.env.REACT_APP_ENDPOINT}/signin/user`, loginCreds);
      localStorage.setItem('token', loginRes.data.token)
      setLoginRes(loginRes)
      console.log("Form user state", loginRes)
      setProfileData(loginRes.data.user)
      if (loginRes.status == 200) {
        setAlertRes(prev => ({ ...prev, showAlert: true, message: loginRes.data.message, status: '#2e7d32' }));
      }
      setLoginCreds({
        email: '',
        password: '',
      })
    } catch (error) {
      setAlertRes(prev => ({ ...prev, showAlert: true, message: error.response.data.message, status: '#d32f2f' }));
    }
    alertDelay();
    setLoading(false)
    navigate('/')
  }

  //USER PROFILE
  const userProfile = async () => {
    try {
      const profileDetails = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/single/user/`,
        { headers: { token: localStorage.getItem('token'), 'content-type': 'application/json' } });
      setProfileData(profileDetails.data.user)
    } catch {
      console.log("No details found")
    }
  }

  //LOGOUT USER
  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login')
    setLoginRes({});
  }

  //Getting User data
  const [users, setUsers] = useState([]);
  useEffect(() => {
    return async () => {
      const userData = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/user`)
      setUsers(userData.data.data)
    }

  }, [])

  const userContextData = {
    users,
    loading,
    alertRes,
    showPassword,
    loginCreds,
    signUpData,
    loginResponse,
    profileData,
    navigate,
    setProfileData,
    userProfile,
    logoutUser,
    setSignUpData,
    setUsers,
    setLoginCreds,
    setLoginRes,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClickLogin,
    onHandleSignUp,
    onVendorSignUp,
  }

  return (
    <userContext.Provider value={userContextData}>
      {children}
    </userContext.Provider>
  )
}

export default UserState