import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAdd = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(add(content))
    dispatch(setNotification(content))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm