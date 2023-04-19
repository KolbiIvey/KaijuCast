import React from 'react'
import './SearchResults.css'
import * as favoritesAPI from '../../utilities/favorites-api'



export default function SearchResults({weather, forecast}) {

  async function handleClick() {
    const cityName =  weather.name;
    const favLocationId = await favoritesAPI.saveFav(cityName)
    console.log(favLocationId)

  }

  return (
    <div>
      <div className='search-results'>
        <button name='favButton' onClick={handleClick}>Add to Favorites</button>
        {weather && (
          <div className='current-weather'>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Current Temp: {Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
            <p>Current Weather Conditions: {weather.weather[0].description}</p>
          </div>
        )}

        <div className='forecast-container'>
          {forecast && forecast.map((item) => (
              <div className='forecast-value' key={item.dt}>
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
