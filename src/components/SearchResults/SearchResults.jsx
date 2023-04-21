import React from 'react'
import './SearchResults.css'
import * as favoritesAPI from '../../utilities/favorites-api'
import sunnyKaiju from '../../../src/assets/clear-sky.jpeg'
import cloudKaiju from '../../../src/assets/cloudy.jpeg'
import snowKaiju from '../../../src/assets/snow.jpeg'
import rainKaiju from '../../../src/assets/rain.png'

export default function SearchResults({weather, forecast}) {

  async function handleClick() {
    const cityName =  weather.name;
    const favLocationId = await favoritesAPI.saveFav(cityName)
    console.log(favLocationId)
  }

  function kaijuBackground(weatherIdNum) {
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
  
  return (
    <div>
      <div className='search-results'>
        <button className='favButton' onClick={handleClick}>Add to Favorites</button>
        {weather && (
          <div className='current-weather' style={{backgroundImage: `url(${kaijuBackground(weather.weather[0].id)})`}}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Current Temp: {Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
            <p>Current Weather Conditions: {weather.weather[0].description}</p>
          </div>
        )}

        <div className='forecast-container'>
          {forecast && forecast.map((item) => (
              <div className='forecast-value' key={item.dt} style={{backgroundImage: `url(${kaijuBackground(item.weather[0].id)})`}}>
                  <p> Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                  <p>Temp: {Math.round((item.main.temp - 273.15) * 9/5 + 32)}°F</p>
                  <p>Weather: {item.weather[0].description}</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
