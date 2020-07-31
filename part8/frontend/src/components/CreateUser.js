import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setFavorite] = useState('')
  const [createUser] = useMutation(CREATE_USER)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createUser({variables: { username, favoriteGenre }})
    setUsername('')
    setFavorite('')
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          favorite
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavorite(target.value)}
          />
        </div>
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default Login
