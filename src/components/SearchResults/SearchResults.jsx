import React from 'react'

export default function SearchResults({weather, forecast}) {
    console.log(forecast)
  return (
    <div>
      {weather && (
        <>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Current Temp: {Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
          <p>Current Weather Conditions: {weather.weather[0].description}</p>
        </>
      )}

      <div>
        {forecast && forecast.map((item) => (
            <div key={item.dt}>
                <p> Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {Math.round((item.main.temp - 273.15) * 9/5 + 32)}°F</p>
                <p>Weather: {item.weather[0].description}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
