import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    } else if (result.data){
      setBooks(result.data.allBooks)
    }
  })
  if (!props.show) return null
  if (loading || result.loading) return <div>loading...</div>

  const genres = () => {
    let genres = []
    result.data.allBooks.forEach(book => {
      book.genres.forEach( genre => {
        if (!genres.find(g => g === genre)){
          genres.push(genre)
        }
      })
    })
    return (
      <div>
        {genres.map(g => 
          <button key={g} onClick={() => getBooks({variables: {genre: g}})}>{g}</button>  
        )}
        <button key={'reset'} onClick={() => getBooks({variables: {genre: ''}})}>All genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres()}
    </div>
  )
}

export default Books