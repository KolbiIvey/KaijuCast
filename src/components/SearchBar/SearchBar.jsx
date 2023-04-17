import { set } from 'mongoose'
import React, { useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'



export default function SearchBar() {
    
    const [weather, setWeather] = useState(null)
    const [search, setSearch] = useState('')

    const apiToken = import.meta.env.VITE_API_KEY

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiToken}`)
        const weatherData = await weatherResponse.json()
        console.log(weatherData)
        setWeather(weatherData)
    }
    console.log(weather)

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
        {weather && <SearchResults weather={weather} />}
      </div>
    </div>
  )
}
