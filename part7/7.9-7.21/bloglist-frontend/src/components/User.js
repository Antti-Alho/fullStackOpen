import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"

const User = () => {
  const id = useParams().id
  let user = useSelector( state => state.users.find(user => user.id === id) )
  
  if (!user) {
    return (
      <h2> ¤=¤ 404 ¤=¤ :(</h2>
    )
  }

  const userStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='user' style={userStyle}>
      <h2>{user.name}</h2>
      <div>
        <p>Added blogs</p>
        <ul>
        {user.blogs.map(blog =>
          <Link key={blog.id+'link'} to={`/blogs/${blog.id}`}>
            <li key={blog.id+'title'}>{blog.title}</li>
          </Link>
        )}
        </ul>
      </div>
    </div>
  )

}

export default User
