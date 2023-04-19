import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as favoritesAPI from '../../utilities/favorites-api'

export default function FavLocations() {

    const [userFavLocations, setUserFavLocations] = useState([]);

    const navigate = useNavigate();

    function handleClick() {
      navigate('/search')
    }

    useEffect(function() {
        
        async function getUserLocations() {
            const userLocation = await favoritesAPI.getFav();
            setUserFavLocations(userLocation);
        }

        getUserLocations();

    },[]);

  return (
    <div>
      <button onClick={handleClick}>Search</button>
        Fav Locations
        This is where my fav locations will be 
    </div>
  )
}
