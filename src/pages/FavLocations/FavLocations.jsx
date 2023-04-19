import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as favoritesAPI from '../../utilities/favorites-api'

export default function FavLocations() {

  const [weather, setWeather] = useState(null)

  const apiToken = import.meta.env.VITE_API_KEY

  const navigate = useNavigate();

  function handleClick() {
    navigate('/search')
  }

  useEffect(function() {
      
      async function getUserLocations() {
          const userLocation = await favoritesAPI.getFav();

          for (let i = 0; i < userLocation.length; i++) {
            const favLocation = userLocation[i];

            //making api call to get the data for the saved location
            const favLocationRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${favLocation}&appid=${apiToken}`)
            const favLocationData = await favLocationRes.json();
            console.log(favLocationData)
            setWeather(favLocationData)
            console.log(weather, 'this is my weather state')
          }
      }
      getUserLocations();
  },[]);

  return (
    <div>
      <button onClick={handleClick}>Search</button>
      <h3>Favorite Locations</h3>
      {/* <div>
        {weather.map((wData, idx) => (
          <div key={idx}>
            <p>{wData.name}</p>
            <p>Temp: {Math.round((wData.main.temp - 273.15) * 9/5 + 32)}°F</p>
            <p>{wData.weather[0].description}</p>
          </div>
        ))}
      </div> */}

    </div>
  )
}
