import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  const result = useQuery(ME)
  const [books, setBooks] = useState([])
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  })

  if (!props.show) return null
  if (result.loading || loading ) return <div>loading...</div>
  if (!books.length) {
    getBooks({variables: { genre: result.data.me.favoriteGenre } })
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {result.data.me.favoriteGenre}</p>
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
    </div>
  )
}

export default Recommended