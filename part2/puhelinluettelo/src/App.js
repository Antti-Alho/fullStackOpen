import React, { useState, useEffect }from 'react'
import axios from 'axios'
import Haku from './components/haku'
import Lisaa from './components/lisaa'
import Numerot from './components/numerot'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personToShow, setPersonsToShow] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsToShow(response.data)
      }
    )
  },[] )

  return (
    <div>
      <Haku
        setPersonsToShow={setPersonsToShow}
        persons={persons}
      />
      <Lisaa
        persons={persons}
        setPersons={setPersons}
      />
      <Numerot personToShow={personToShow}/>
    </div>
  )
}

export default App