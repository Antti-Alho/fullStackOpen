import React from 'react'

const Total = ({parts}) => {
  const total = 
    parts.reduce( (s, p) => s + p.exercises, 0);

  return (
    <p>total of {total} exercises</p>
  )
}

export default Total;

  