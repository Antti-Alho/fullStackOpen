import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, setUser}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response = await blogService.create({title: title, author: author, url: url})
    console.log(response)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>Author:
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>Url:
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
