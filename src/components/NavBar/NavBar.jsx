import React from 'react'
import { useNavigate } from 'react-router-dom';
import UserLogOut from '../UserLogOut/UserLogOut'
import './NavBar.css'

export default function NavBar({user, setUser}) {

    const navigate = useNavigate();
    //these handle clicks navigate to the respective pathways
    function handleClick() {
      navigate('/favorites')
    }

    function handleSecondClick() {
      navigate('/search')
    }
  


  return (

    <div className='nav-Container'>
        <UserLogOut user={user} setUser={setUser} />
        <div>How are you today, {user.name}?</div>
        <div>
            <button onClick={handleSecondClick}>Search</button>
            <button onClick={handleClick}>Fav Locations</button>
        </div>
    </div>
  )
}
