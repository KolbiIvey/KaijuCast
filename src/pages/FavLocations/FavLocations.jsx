import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as favoritesAPI from '../../utilities/favorites-api'

export default function FavLocations() {

  const [weather, setWeather] = useState([])
 
  const apiToken = import.meta.env.VITE_API_KEY

  const navigate = useNavigate();

  function handleClick() {
    navigate('/search')
  }

  useEffect(function() {
    async function getUserLocations() {
      const userLocation = await favoritesAPI.getFav();
  
      const weatherPromises = userLocation.map(async (favLocation) => {
        const favLocationRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${favLocation.location}&appid=${apiToken}`);
        return favLocationRes.json();
      });
  
      const weatherData = await Promise.all(weatherPromises);
      setWeather(weatherData);
    }
  
    getUserLocations();
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Search</button>
      <h3>Favorite Locations</h3>
      {weather.length === 0 ? (
        <p>What did you expect something magical? Add some favorite locations.</p>

      ) : (
        <div>
        {weather.map((wData, idx) => (
          <div key={idx}>
            <p>{wData.name}</p>
            <p>Temp: {Math.round((wData.main.temp - 273.15) * 9/5 + 32)}°F</p>
            <p>{wData.weather[0].description}</p>
          </div>
        ))}
      </div>
    )}
    </div>
  )
}
