import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as favoritesAPI from '../../utilities/favorites-api'
import './FavLocations.css'
import sunnyKaiju from '../../../src/assets/clear-sky.jpeg'
import cloudKaiju from '../../../src/assets/cloudy.jpeg'
import snowKaiju from '../../../src/assets/snow.jpeg'
import rainKaiju from '../../../src/assets/rain.png'

export default function FavLocations() {

  const [weather, setWeather] = useState([])
 
  const apiToken = import.meta.env.VITE_API_KEY

    function kaijuBackground(weatherData) {
      const weatherIdNum = weatherData.weather[0].id;
    if(weatherIdNum >=200 && weatherIdNum <= 531) {
      //this is the image for rain
      return rainKaiju;
    } else if (weatherIdNum >= 600 && weatherIdNum <= 622) {
      //image for snow
      return snowKaiju;
    } else if(weatherIdNum >= 801 && weatherIdNum <= 804) {
      //image for clouds
      return cloudKaiju;
    } else {
      //image for sunny weather
      return sunnyKaiju
    }
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
    <div className='fav-text-container'>
      <h2>Favorite Locations</h2>
      {weather.length === 0 ? (
        <p>What did you expect something magical? Add some favorite locations.</p>
        
        ) : (
          <div className='fav-container'>
        {weather.map((wData, idx) => (
          <div className='fav-value' key={idx} style={{backgroundImage: `url(${kaijuBackground(wData)})`}}>
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
