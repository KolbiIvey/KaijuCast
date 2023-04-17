import React from 'react'

export default function SearchResults({weather}) {
  return (
    <div>
      {weather && (
        <>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </>
      )}
    </div>
  )
}
