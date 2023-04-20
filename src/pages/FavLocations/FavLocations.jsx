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
    //async gunction that will grab the users favroite locations
    async function getUserLocations() {
      //getFav() method of my FavoritesAPI object is being called to retrieve an array 
      //of the user's favorite locations
      const userLocation = await favoritesAPI.getFav();
      //The map() method is being used to loop through each favorite location
      // in the userLocation array and create an array of promises that will resolve to the weather data for each location
      const weatherPromises = userLocation.map(async (favLocation) => {
      //The fetch() function is being called with the URL of the OpenWeatherMap API endpoint
      // that corresponds to the favLocation.location value, along with the apiToken variable as the API key.
        const favLocationRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${favLocation.location}&appid=${apiToken}`);
        // The response is then converted to JSON format using the json() method and returned as a resolved promise.
        return favLocationRes.json();
      });
      //The Promise.all() function is being used to wait for all
      // of the promises in the weatherPromises array to resolve.
      //Once all of the promises have resolved, an array of weather
      // data objects is returned and assigned to the weatherData variable.
      const weatherData = await Promise.all(weatherPromises);
      //Finally, the setWeather() function is being called to update the state of
      // the weather variable with the new weatherData array.
      setWeather(weatherData);
    }
    //The getUserLocations() function is being called immediately after the component mounts
    getUserLocations();
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Search</button>
      <h2>Favorite Locations</h2>
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
