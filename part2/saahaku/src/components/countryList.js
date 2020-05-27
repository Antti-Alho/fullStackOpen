import React, {useEffect} from 'react'
import Country from './country'

const CountryList = ({ countries, filter, setCountryToShow }) => {

  const list = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    if (list.length === 1) {
      setCountryToShow(list[0])
    }
  })

  return (
    <ul>
      {
        list.length >= 10
          ? 'Too many matches, be more specific'
          : list.map(country =>
            <Country
              key={country.name}
              country={country}
              setCountryToShow={setCountryToShow}
            /> || console.log(list)
          )
      }
    </ul>
  )
}

export default CountryList;