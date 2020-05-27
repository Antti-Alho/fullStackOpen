import React from 'react'

const Weather = ({ weather }) => {
  return (
    <div>
      <h3>
        weather in {weather.location.name}
      </h3>
      <img src={weather.current.weather_icons[0]} alt='weather icon'/>
      <p>
        temperature: {weather.current.temperature}
      </p>
    </div>
  )
}

export default Weather;