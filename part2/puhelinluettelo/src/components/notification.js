import React from 'react'

const Notification = ({ message, errorStatus }) => {

  const Style = {
    color: errorStatus ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={Style} className="error">
      {message}
    </div>
  )
}

export default Notification