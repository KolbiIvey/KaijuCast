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
//this function will check the weather code/condition of the location
//and return a corresponding kaiju img 
  function kaijuBackground(weatherIdNum) {
    //if the weather id code is between 200 and 531 it will return
    //the kaiju image for rain, the codes are inclusive to OpenWeatherMap API
    if(weatherIdNum >=200 && weatherIdNum <= 531) {
      //this is the image for rain
      return rainKaiju;
      //same thing here except it will return the snow kaiju img
    } else if (weatherIdNum >= 600 && weatherIdNum <= 622) {
      //image for snow
      return snowKaiju;
      //this will return the cloud kaiju img
    } else if(weatherIdNum >= 801 && weatherIdNum <= 804) {
      //image for clouds
      return cloudKaiju;
    } else {
      //if none of the above codes are hit, sunny img will be returned
      //image for sunny weather
      return sunnyKaiju
    }
  }
  
  return (
    <div>
      <div className='search-results'>
        <button className='favButton' onClick={handleClick}>Add to Favorites</button>
        {weather && (
          // On the line below we seting the backgroung img of the current weather div to equal weather condition id number
          //and its corresponding img
          <div className='current-weather' style={{backgroundImage: `url(${kaijuBackground(weather.weather[0].id)})`}}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Current Temp: {Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F</p>
            <p>Current Weather Conditions: {weather.weather[0].description}</p>
          </div>
        )}

        <div className='forecast-container'>
          {forecast && forecast.map((item) => (
            //same thing is hapening on this line, theres just more elements that may potentially have different background imgs
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
