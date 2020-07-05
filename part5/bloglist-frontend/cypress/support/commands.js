// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({ userName, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    userName, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  const options = {
      method: 'POST',
      json: 'true',
      body: { title: title, author: author, url: url },
      url: 'http://localhost:3001/api/blogs',
      headers: {
        'authorization': localStorage.getItem('loggedBlogAppUser')
      }
    }
  cy.request( options ,() => { cy.visit('http://localhost:3000')})
})

