import React, {useState} from 'react'
import helperContext from './HelperContext'

const HelperState = ({children}) => {
    const [state, setState] = useState(false);


    const handleClick = () => {
      setState(true);
    };
  
    const handleClose = () => {
      setState(false);
    };

    const helperContextData = {
      state,
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