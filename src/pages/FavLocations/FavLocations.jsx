import React, { useEffect, useState } from 'react'
import * as favoritesAPI from '../../utilities/favorites-api'

export default function FavLocations() {

    const [userFavLocations, setUserFavLocations] = useState([]);

    useEffect(function() {
        
        async function getUserLocations() {
            const userLocation = await favoritesAPI.getFav();
            setUserFavLocations(userLocation);
        }

        getUserLocations();

    },[]);

  return (
    <div>
        Fav Locations
    </div>
  )
}
