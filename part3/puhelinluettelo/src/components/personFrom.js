import React, { useState } from 'react'
import ps from '../services/personService'

const PersonForm = ({ persons, setPersons, setMessage, setErrorStatus}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    persons.filter(person => person.name === newName).length === 0
      ? create()
      : update()
  }

  const create = () => {
    ps.createPerson({ name: newName, number: newNumber })
      .then( () => {
        refresh() 
        setMessage(`${newName} created`) 
        setErrorStatus(false) 
      })
      .catch( error => {
        setMessage(error.response.data.error) 
        setErrorStatus(true) 
      })
  }

  const update = () => {
    if (window.confirm(`${newName} is already in the phonebook, replace the old number with ne one ?`)){
      const person = persons.find(person => person.name === newName)
      ps.updatePerson(person.id, { name: newName, number: newNumber })
        .then( () => { 
          refresh()
          setMessage(`${newName} number changed to ${newNumber}`)
          setErrorStatus(false) 
        })
        .catch( error => {
          setMessage(error.response.data.error)
          setErrorStatus(true)
        })
    }
  }

  const refresh = () => {
    ps.getAllPersons()
    .then( data => setPersons(data) )
  }

  return (
    <div>
      <h2>Add / Edit</h2>
      <form onSubmit={handleSubmit}>
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

export default PersonForm
