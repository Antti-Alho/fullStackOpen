import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './weather'

const CountryDetails = ({ countryToShow }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countryToShow.capital}`)
      .then(response => setWeather(response.data) || console.log(response.data))
  }, [countryToShow])
  
  return (
    <div>
      <h2> {countryToShow.name} </h2>
      <ul>
        <p>capital: {countryToShow.capital}</p>
        <p> population: {countryToShow.population}</p>
      </ul>

      <h3>Languages</h3>
      <ul>
        {countryToShow.languages.map(language =>
          <li key={language.iso639_1}> {language.name}</li>
        )}
      </ul>
      <img src={countryToShow.flag} alt='flag' width='240'/>
      {weather.location !== undefined
        ? <Weather weather={weather}/>
        : null
      }
    </div>
  )
}

export default CountryDetails