import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import BlogForm from './BlogForm'

test('Blog form calls createBlog handler with right parameters', () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler}/>
  )
  
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Matin Autokoulu Blog' } 
  })
  fireEvent.change(author, { 
    target: { value: 'Matti' } 
  })
  fireEvent.change(url, { 
    target: { value: 'www.MatinAutoBlog.com' } 
  })

  const button = component.getByText('submit')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Matin Autokoulu Blog' )
  expect(mockHandler.mock.calls[0][0].author).toBe('Matti' )
  expect(mockHandler.mock.calls[0][0].url).toBe('www.MatinAutoBlog.com' )

})
