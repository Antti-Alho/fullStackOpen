import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogToggleRef = React.createRef()
  const loginToggleRef = React.createRef()
  let blogs = useSelector( state => state.blogs )
  let users = useSelector( state => state.users )

  useEffect(() => {
    dispatch(initBlogs())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <div>
      <Notification />
      {user === null 
      ? <Togglable buttonLabel="login" default={true} ref={loginToggleRef}>
          <Login login={login}/>
        </Togglable>
      : <Togglable buttonLabel="new blog" default={false} ref={blogToggleRef}>
          <BlogForm/>
        </Togglable>
      }
      {user !== null 
        ? <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        : <p></p>
      }
      <div id='blog-list'>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog 
          key={blog.id}
          blog={blog}
          user={user} />
      )}
      </div>
    </div>
  )
}

export default App