import React, { useState } from 'react'

const Haku = ({ setPersonsToShow, persons }) => {

  const [filter, setFilter] = useState('')

  const HandleFilterChange = (event) => {
    setFilter(event.target.value)
    setPersonsToShow( persons.filter( person => {
      person.name.toLowerCase().includes(filter.toLowerCase()) 
    }))
  }
  return (
    <div>
      <h2>Search</h2>
      <form>
        <div>search:
          <input
            value={filter}
            onChange={HandleFilterChange}
          />
        </div>
      </form>
    </div>
  )

}

export default Haku