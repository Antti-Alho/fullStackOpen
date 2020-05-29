import React from 'react'

const Haku = ({ filterString, setFilter}) => {

  const HandleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Search</h2>
      <form>
        <div>search:
          <input
            value={filterString}
            onChange={HandleFilterChange}
          />
        </div>
      </form>
    </div>
  )

}

export default Haku
