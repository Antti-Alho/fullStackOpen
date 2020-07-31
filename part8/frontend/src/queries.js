import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]){
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author { name }
      published
      genres
      id
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title 
    author { 
      name
    }
    published 
    genres
  }
`

export const ALL_BOOKS = gql`
  query findBook($genre: String){
    allBooks(genre: $genre) { 
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      id
      born
      bookCount
    }
  }
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $favoriteGenre: String!) {
    createUser(username: $username, favoriteGenre: $favoriteGenre){
      username
      favoriteGenre
    }
  }
`

export const RESET_DB = gql`
  mutation {
    initDB(reset: true)
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`