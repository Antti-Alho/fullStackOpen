import React, {useState, useEffect} from 'react'
import Person from './person'

const Numbers = ({ persons, setPersons, filterString, setMessage, setErrorStatus  }) => {

  const [personsToShow, setPersonsToShow] = useState([])

  useEffect( () => {
    console.log(persons)
    setPersonsToShow(persons.filter( person =>
      person.name.toLowerCase().includes(filterString.toLowerCase())
    ))
  }, [filterString, persons] )

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) =>
          <Person 
            key={person.id}
            person={person}
            setPersons={setPersons}
            setMessage={setMessage}
            setErrorStatus={setErrorStatus}
          />
        )}
      </ul>
    </div>
  )

}

export default Numbers
