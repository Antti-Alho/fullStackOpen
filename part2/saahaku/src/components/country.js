import React from 'react'

const Country = ({ country, setCountryToShow }) => {

  const handleClick = () => setCountryToShow(country)

  return (
    <div>
      <p>
        {country.name}
      </p>
      <button onClick={handleClick}>show</button>
    </div>
  )
}

export default Country;