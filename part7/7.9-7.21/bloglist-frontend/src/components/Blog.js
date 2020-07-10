import React from 'react'
import Togglable from './Togglable'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete this blog?")) {
      dispatch(setNotification(`${blog.title} deleted`, false))
      dispatch(deleteBlog(blog.id))
    }
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} 
      <Togglable buttonLabel='view' hideLabel='hide'>
        <br/>{blog.url}
        <br/>{blog.likes} <button onClick={handleLike}>like</button>
        <br/>{blog.user.name}
        <br/>
        {user && user.name === blog.user.name
        ? <button onClick={handleDelete}>Delete</button>
        : null }
      </Togglable>
    </div>
  )

}

export default Blog
