import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, handleDelete, handleLike }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
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
