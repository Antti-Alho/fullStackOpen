import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button';
import { useField } from '../hooks/field'

const BlogForm = () => {

  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({ title: title.value, author: author.value, url: url.value }))
      title.onReset()
      author.onReset()
      url.onReset()
      dispatch(setNotification(`blog ${title.value} created`, false))
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
          <input {...title}/>
        </div>
        <div>Author:
          <input {...author}/>
        </div>
        <div>Url:
          <input {...url}/>
        </div>
        <div>
          <Button id='submit-button' type="submit">submit</Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
