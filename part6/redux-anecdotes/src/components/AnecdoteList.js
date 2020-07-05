import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(setNotification(anecdotes.find(a => a.id === id).content))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  return (
    <div>
      {
        anecdotes
          .filter(a => a.content.toLowerCase().includes(filter))
          .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default AnecdoteList