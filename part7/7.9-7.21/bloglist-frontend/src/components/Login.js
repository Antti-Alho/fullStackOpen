import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleNameChange = (event) => setUsername(event.target.value)
  const handlePWChange = (event) => setPassword(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }



  return (
    <div>
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            id="username-input"
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>Password:
          <input
            id="password-input"
            value={password}
            onChange={handlePWChange}
          />
        </div>
        <div>
          <button id="login-button" type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
