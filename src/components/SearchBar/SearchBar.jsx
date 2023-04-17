import { set } from 'mongoose'
import React, { useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'



export default function SearchBar() {
    
    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [search, setSearch] = useState('')

    const apiToken = import.meta.env.VITE_API_KEY

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        //This is the api call to get current weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiToken}`)
        const weatherData = await weatherResponse.json();
        console.log(weatherData)
        setWeather(weatherData);

        //making api call to get the forecast data for the searched location
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiToken}`)
        const forecastData = await forecastResponse.json();
        console.log(forecastData)
        setForecast(forecastData)
    }

    const handleChange = (evt) => {
        setSearch(evt.target.value)
    }



  return (
    <div>
      <div className='Searchbar'>
        <form onSubmit={handleSubmit}>
          <input type='text' value={search} onChange={handleChange} />
          <button type='submit'>Search a Location</button>
        </form>
        {weather && <SearchResults weather={weather} forecast={forecast}/>}
      </div>
    </div>
  )
}
