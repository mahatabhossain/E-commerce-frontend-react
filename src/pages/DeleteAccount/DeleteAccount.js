import React, {useContext} from 'react'
import userContext from '../../context/UserContext'
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteAccount = () => {

const { profileData } = useContext(userContext);

  return (
    <div>
      <p>Delete your account</p>
      <Toolbar/>
      <div>
        {profileData.fullName} <DeleteIcon/>
      </div>
       </div>
    
  )
}

export default DeleteAccount