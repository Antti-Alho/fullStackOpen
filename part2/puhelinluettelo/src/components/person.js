import React from 'react'
import ps from '../services/personService'

const Person = ({ person, setPersons }) => {

  const deleteFunction = (person) => {
    if (window.confirm(`Delete ${person.name}`)){
      ps.deletePerson(person.id)
      .then(() => {
        ps.getAllPersons()
        .then( data => {
          setPersons(data)
        })
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