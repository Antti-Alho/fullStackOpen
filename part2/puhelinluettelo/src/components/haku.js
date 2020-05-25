import React from 'react'

const Haku = ({filter, setFilter, setPersonsToShow, persons }) => {

  const HandleFilterChange = (event) => {
    setFilter(event.target.value)
    setPersonsToShow( persons.filter( person => 
      console.log(person.name) || person.name.includes(filter) 
    ))
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