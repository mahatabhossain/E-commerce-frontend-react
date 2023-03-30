import UserCard from '../Card/Card'
import React, {useContext} from 'react'
import './CardBoxStyle.css' 
import userContext from '../../context/UserContext';

const CardBox = () => {
  const { 
    users,
  } = useContext(userContext);

  return (
    <div className='card_box_container'>
      <div className='cards'>
        {
            !!users&&users.map((item, index) => <UserCard user = {item} key = {index}/>)
        }
    </div>
    </div>
    
  )
}

export default CardBox