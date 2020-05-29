import React, { useState } from 'react'
import ps from '../services/personService'

const Lisaa = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if ( persons.filter(person => person.name === newName).length === 0 ){
      ps.createPerson({ name: newName, number: newNumber })
      .then( () => { 
        ps.getAllPersons()
        .then( data => {
          setPersons(data)
        })
      })
    } else {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with ne one ?`)){
        const person = persons.find(element => element.name === newName)
        ps.updatePerson(person.id, { name: newName, number: newNumber })
        .then(() => {
          ps.getAllPersons()
          .then( data => {
            setPersons(data)
          })
        })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
