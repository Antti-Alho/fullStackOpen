import React, {useEffect} from 'react'

const Search = ({ filter, setFilter, setCountryToShow }) => {
    
  const HandleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    setCountryToShow({})
  },[filter, setCountryToShow])

  return (
    <div>
      <form>
        <div>search countries:
          <input
            value={filter}
            onChange={HandleFilterChange}
          />
        </div>
      </form>
    </div>
  )

}

export default Search