import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const BestAnecdote = ({anecdotes, points}) => {
  const i = points.indexOf(Math.max(...points));
  return (
    <div>
      <h2>Best Anecdote</h2>
      <p>{anecdotes[i]}</p>
      <p>with {points[i]} votes.</p>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const AnecdoteOfTheDay = ({anecdotes, points, selected, setSelected, setPoints}) => {
  
  const vote = () => {
    let arr = [...points]
    arr[selected] = arr[selected] +1
    setPoints(arr)
  }

  const randomInt = ( max ) => {
    return Math.floor(Math.random() * max)
  }

  return(
    <div>
      <h2>Anecdote Of The Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>votes: {points[selected]}</p>
      <Button handleClick={ () => setSelected(randomInt(anecdotes.length)) } text={"get anecdote"}/>
      <Button handleClick={ () => vote() } text={"vote"}/>
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>

      <BestAnecdote 
        anecdotes={anecdotes}
        points={points}
      />

      <AnecdoteOfTheDay 
        anecdotes={anecdotes} 
        points={points} 
        selected={selected} 
        setSelected={setSelected} 
        setPoints={setPoints}
      />

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
