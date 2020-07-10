import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({ title: title, author: author, url: url }))
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(setNotification(`blog ${title} created`, false))
    } catch (error) {
      dispatch(setNotification(`something went wrong :-(`, true))
    }
  }


  return (
    <div>
      <h2>create new</h2>
      <form is='blog-form' onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>Author:
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>Url:
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button id='submit-button' type="submit">submit</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
