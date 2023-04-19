import React from 'react'
import './SearchResults.css'



export default function SearchResults({weather, forecast}) {

  return (
    <div>
      <div className='search-results'>
        <button name='favButton'>Add to Favorites</button>
        {weather && (
          <div className='cureent-weather'>
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
