import React, { useState } from 'react'
import ps from '../services/personService'

const Lisaa = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    persons.filter(person => person.name === newName).length === 0
      ? create()
      : update()
  }

  const create = () => {
    console.log('asd')
    ps.createPerson({ name: newName, number: newNumber })
    .then( () => refresh() )
  }

  const update = () => {
    if (window.confirm(`${newName} is already in the phonebook, replace the old number with ne one ?`)){
      const person = persons.find(person => person.name === newName)
      ps.updatePerson(person.id, { name: newName, number: newNumber })
      .then( () => refresh() )
    }
  }

  const refresh = () => {
    ps.getAllPersons()
    .then( data => setPersons(data) )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Lisaa
