import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)
  const [message, setMessage] = useState(null)
  const blogToggleRef = React.createRef()
  const loginToggleRef = React.createRef()

  const handleLogout = () => {
    setMessage(`user ${user.name} logged out`)
    setErrorStatus(false)
    setTimeout(() => setMessage(null), 5000)
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async ( data ) => {
    try {
      await blogService.create( data )
      setMessage(`blog ${data.title} created`)
      setErrorStatus(false)
      setTimeout(() => setMessage(null), 5000)
    } catch (e) {
      setMessage(`something went wrong :-(`)
      setErrorStatus(true)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const login = async ( username, password ) => {
    try {
      let newUser = await loginService.login(username, password)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setMessage(`${newUser.name} logged in`)
      setErrorStatus(false)
      setTimeout(() => setMessage(null), 5000)
    } catch (e) {
      setMessage(`wrong username or password`)
      setErrorStatus(true)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLike = async (id) => {
    const blog = await blogService.getOne(id)
    blog.likes++
    blog.user = blog.user.id
    await blogService.update(id, blog)
  }

  const handleBlogDelete = async (id) => {
    if (window.confirm("Do you really want to delete this blog?")) { 
      await blogService.deleteBlog(id)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  })

  return (
    <div>
      <Notification 
        message={message}
        errorStatus={errorStatus}
      />
      {user === null 
      ? <Togglable buttonLabel="login" ref={loginToggleRef}>
          <Login login={login}/>
        </Togglable>
      : <Togglable buttonLabel="new blog" ref={blogToggleRef}>
          <BlogForm createBlog={createBlog}/>
        </Togglable>
      }
      <h2>blogs</h2>
      {user !== null 
        ? <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        : <p></p>
      }
      {blogs.map(blog =>
        <Blog 
          key={blog.id}
          blog={blog}
          user={user}
          handleDelete={() => handleBlogDelete(blog.id)}
          handleLike={() => handleLike(blog.id)} />
      )}
    </div>
  )
}

export default App