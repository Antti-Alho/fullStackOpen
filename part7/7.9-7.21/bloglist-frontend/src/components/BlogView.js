import React from 'react'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { useField } from '../hooks/field'

const BlogView = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  let blogs = useSelector( state => state.blogs )
  let user = useSelector( state => state.user )
  const id = useParams().id
  let blog = blogs.find(n => n.id === id)
  let comment = useField('text')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete this blog?")) {
      dispatch(setNotification(`${blog.title} deleted`, false))
      dispatch(deleteBlog(blog.id))
      history.push('/blogs')
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(id, comment.value))
  }

  if (!blog) {
    return(null)
  }

  return(
    <div className='blog' style={blogStyle}>
      <h2>{blog.title} {blog.author}</h2>
        <br/>{blog.url}
        <br/>{blog.likes} <button onClick={handleLike}>like</button>
        <br/>added by {blog.user.name}
        <br/>
        {user && user.name === blog.user.name
        ? <button onClick={handleDelete}>Delete</button>
        : null }

      <h2>comments</h2>
      <form onSubmit={handleCommentSubmit}>
        comment <input {...comment} /> <br/>
        <button>comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.comment}</li>
        )}
      </ul>
    </div>
  )

}

export default BlogView
