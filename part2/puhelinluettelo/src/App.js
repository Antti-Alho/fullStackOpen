import React, { useState }from 'react'
import Haku from './components/haku'
import Lisaa from './components/lisaa'
import Numerot from './components/numerot'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [personToShow, setPersonsToShow] = useState(persons)
  const [filter, setFilter] = useState('')

  return (
    <div>
      <Haku 
        filter={filter}
        setFilter={setFilter}
        setPersonsToShow={setPersonsToShow}
        persons={persons}
      />
      <Lisaa 
        setPersonsToShow={setPersonsToShow}
        persons={persons}
        setPersons={setPersons}
      />
      <Numerot personToShow={personToShow}/>
    </div>
  )

}

export default App