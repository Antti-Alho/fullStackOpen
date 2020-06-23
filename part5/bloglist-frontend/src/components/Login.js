import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const PersonForm = ({user, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleNameChange = (event) => setUsername(event.target.value)
  const handlePWChange = (event) => setPassword(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    let newUser = await loginService.login(username, password)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))
    blogService.setToken(newUser.token)
    setUser(newUser)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken('')
    setUser(null)
  }
  
  if (user !== null) {
    return (
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    )
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

export default PersonForm
