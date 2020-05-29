import React, { useState, useEffect }from 'react'
import Haku from './components/haku'
import Lisaa from './components/lisaa'
import Numerot from './components/numerot'
import ps from './services/personService'

const App = () => {
  const [filterString, setFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    ps.getAllPersons().then( data => {
      setPersons(data)
      console.log(data)
    })
  },[] )

  return (
    <div>
      <Haku
        filter={filterString}
        setFilter={setFilter}
      />
      <Lisaa persons={persons} setPersons={setPersons}/>
      <Numerot persons={persons} setPersons={setPersons} filterString={filterString}/>
    </div>
  )
}

export default App