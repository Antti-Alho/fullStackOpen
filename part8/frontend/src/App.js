
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import CreateUser from './components/CreateUser'
import Recommended from './components/Recommended'
import {
  useSubscription, 
  useApolloClient
} from '@apollo/client'
import {BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS} from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('book-app-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInBookStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInBookStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInBookStore.allBooks.concat(addedBook) }
      })
    }
    const dataInAuthorStore = client.readQuery({ query: ALL_AUTHORS })
    console.log(dataInAuthorStore,addedBook.author)
    if (!includedIn(dataInAuthorStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : dataInAuthorStore.allAuthors.concat(addedBook.author) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`Uusi kirja lisätty ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('register')}>register</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        {token
        ? <button onClick={() => logout()}>logout</button>
        : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'}/>
      <Books show={page === 'books'}/>
      <NewBook show={page === 'add'}/>
      <Login show={page === 'login'} setToken={setToken}/>
      <CreateUser show={page === 'register'}/>
      <Recommended show={page === 'recommended'}/>

    </div>
  )
}

export default App