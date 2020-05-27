import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/search'
import CountryList from './components/countryList'
import CountryDetails from './components/countryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryToShow, setCountryToShow] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Search
        filter={filter}
        setFilter={setFilter}
        setCountryToShow={setCountryToShow}
      />
      {countryToShow.name === undefined
        ? <CountryList 
            countries={countries}
            filter={filter}
            setCountryToShow={setCountryToShow}
          />
        : null}
      {countryToShow.name !== undefined
        ? <CountryDetails countryToShow={countryToShow}/>
        : null}
    </div>
  )
}

export default App
