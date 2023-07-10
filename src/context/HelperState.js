import axios from 'axios';
import React, {useState} from 'react'
import helperContext from './HelperContext'

const HelperState = ({children}) => {
    const [state, setState] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchInput, setSearchInput] = useState('')
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = () => {
      setState(true);

    };
  
    const handleClose = () => {
      setState(false);
    };

    const handlePopupClick = (event, email) => {
      setAnchorEl(event.currentTarget);
      sendOTP(email)
    };
  
    const handlePopupClose = () => {
      setAnchorEl(null);
    };

    const sendOTP = async (email) => {
      try{
        const userOTP = await axios.post(`${process.env.REACT_APP_ENDPOINT}/send/otp`, {email});
        console.log(userOTP)
        setShowPopup(userOTP.data.isError);
      }catch(err){
        console.log(err)
      }
    }

    const helperContextData = {
      state,
      anchorEl,
      open,
      id,
      showPopup,
      searchInput,
      setSearchInput,
      sendOTP,
      setState,
      handlePopupClose,
      setAnchorEl,
      handlePopupClick,
      handleClose,
      handleClick,

    };


  return (
    <helperContext.Provider value={helperContextData}>
        {children}
    </helperContext.Provider>
  )
}

export default HelperState