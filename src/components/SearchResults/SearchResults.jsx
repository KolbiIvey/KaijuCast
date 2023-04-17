import React from 'react'

export default function SearchResults({weather, forecast}) {
    console.log(forecast)
  return (
    <div>
      {weather && (
        <>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
        </>
      )}

      <div>
        {forecast && (
            <>
                <p2>{forecast.list}</p2>
            </>
        )}
      </div>
    </div>
  )
}
