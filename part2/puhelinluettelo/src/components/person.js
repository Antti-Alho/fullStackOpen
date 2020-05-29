import React from 'react'
import ps from '../services/personService'

const Person = ({ person, setPersons, setMessage, setErrorStatus }) => {

  const deleteFunction = (person) => {
    if (window.confirm(`Delete ${person.name}`)){
      ps.deletePerson(person.id)
        .then(() => {
          ps.getAllPersons()
          .then( data => {
            setPersons(data)
          })
          setMessage(`${person.name} deleted`)
          setErrorStatus(false)
        })
        .catch( error => { 
          setMessage(`Failed to delete ${person.name} ${error}`)
          setErrorStatus(true)
        })
    }
  }

  return (
    <p>
      {person.name} {person.number}
      <button key={person.id} onClick={() => deleteFunction(person)}>delete</button>
    </p>
  )
}

export default Person;