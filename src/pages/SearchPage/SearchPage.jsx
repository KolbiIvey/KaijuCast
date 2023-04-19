import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserLogOut from '../../components/UserLogOut/UserLogOut';


export default function SearchPage({user, setUser}) {

    const navigate = useNavigate();

    function handleClick() {
      navigate('/favorites')
    }

  return (
    <>
        <button onClick={handleClick}>Fav Locations</button>
        <UserLogOut user={user} setUser={setUser} />
        <div>How are you today, {user.name}?</div>
        <SearchBar />
    </>
  )
}
