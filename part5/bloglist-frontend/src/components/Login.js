import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ( {login} ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleNameChange = (event) => setUsername(event.target.value)
  const handlePWChange = (event) => setPassword(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>Password:
          <input
            value={password}
            onChange={handlePWChange}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
