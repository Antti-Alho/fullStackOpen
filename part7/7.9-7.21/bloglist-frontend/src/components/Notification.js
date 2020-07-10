import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const state = useSelector(state => state.notification)

  const Style = {
    color: state.errorStatus ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (state.message === null) {
    return null
  }

  return (
    <div style={Style} className="error">
      {state.message}
    </div>
  )
}

export default Notification
