import React from 'react'

const Blog = ( { blog } ) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} 
    </div>
  )

}

export default Blog
