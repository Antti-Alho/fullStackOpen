import React, { useState, useEffect }from 'react'
import Search from './components/search'
import PersonForm from './components/personFrom'
import Notification from './components/notification'
import Numbers from './components/numbers'
import ps from './services/personService'

const App = () => {
  const [filterString, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [errorStatus, setErrorStatus] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    ps.getAllPersons().then( data => {
      setPersons(data)
      console.log(data)
    })
  },[] )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        errorStatus={errorStatus}
      />
      <Search
        filterString={filterString}
        setFilter={setFilter}
      />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorStatus={setErrorStatus}
      />
      <Numbers
        persons={persons}
        setPersons={setPersons}
        filterString={filterString}
        setMessage={setMessage}
        setErrorStatus={setErrorStatus}
      />
    </div>
  )
}

export default App