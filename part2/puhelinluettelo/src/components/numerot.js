import React from 'react'
import Person from './person'

const Numerot = ({ personToShow }) => {

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personToShow.map((person) =>
          <Person key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )

}

export default Numerot