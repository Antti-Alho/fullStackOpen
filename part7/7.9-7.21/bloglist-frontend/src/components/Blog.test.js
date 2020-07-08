import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import Blog from './Blog'



const blog = {
  id:'5ef1da3b7d53012220e4959c',
  likes:15,
  title:'Jarin Kukka Blog',
  author:'Jari',
  url:'www.jari.com',
  user:'5eeb76fadf7c502fc8e446a2'
}
const user = {
  id:'5eeb76fadf7c502fc8e446a2',
  userName:'antti',
  name:'antti'
}

test('renders title and author but not details by default', () => {


  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).toHaveTextContent(
    'Jarin Kukka Blog', 'Jari'
  )

  expect(component.container).not.toHaveTextContent(
    'likes','url','15', 'www.jari.com'
  )
})

test('renders title, author and details when you push "show" button', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )
  
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Jarin Kukka Blog', 'Jari', 'likes','url','15', 'www.jari.com'
  )

})

test('Pushing like button calls the event handler', () => {

  const mockHandler = jest.fn()
  const mockHandler2 = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleDelete={mockHandler2} handleLike={mockHandler}/>
  )
  
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})