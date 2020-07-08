describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { 
      name: 'Matti Luukkainen', 
      userName: 'mluukkai', 
      password: 'salainen' 
    }

    const wronguser = {
      name: 'Mati Lukainen',
      userName: 'mlukai',
      password: 'salsasana'
    }
    
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', wronguser)
    cy.visit('http://localhost:3000')
  })



  describe('Login', function () {
    
    it('from is shown', function () {
      cy.contains('Login')
      cy.contains('Username:')
      cy.contains('Password:')
      cy.contains('login')
      cy.contains('cancel')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ userName: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.get('#title').type('Jarin Auto Blog')
      cy.get('#author').type('Jari')
      cy.get('#url').type('www.jari.blogspot.com')
      cy.get('#submit-button').click()

      cy.get('#blog-list')
        .should('contain', 'Jarin Auto Blog Jari')
    })

  })

  describe('When logged in and there are blogs in the system', function () {
    beforeEach(function () {
      cy.login({ userName: 'mluukkai', password: 'salainen' })

      cy.get('#title').type('Jarin Auto Blog')
      cy.get('#author').type('Jari')
      cy.get('#url').type('www.jari.blogspot.com')
      cy.get('#submit-button').click()
    })

    it('A blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('#blog-list')
        .should('contain', '1')
    })

    it('A blog can be deleted', function () {
      cy.contains('view').click()

      cy.on('window:confirm', () => true)
      cy.contains('Delete').click()
      
      cy.get('#blog-list')
        .should('not.contain', 'Jarin Auto Blog Jari')
    })

    it('A blog can not be deleted by another user', function () {
      cy.contains('logout').click()
      cy.get('#username-input').type('mlukai')
      cy.get('#password-input').type('salsasana')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.get('#blog-list')
        .should('not.contain', 'Delete')
    })
  })

  describe('Blogs in list are in right order', function () {
    beforeEach(function () {
      cy.login({ userName: 'mluukkai', password: 'salainen' })

      cy.get('#title').type('Jarin Auto Blog')
      cy.get('#author').type('Jari')
      cy.get('#url').type('www.jari.blogspot.com')
      cy.get('#submit-button').click()

      cy.get('#title').type('Matin Kukka Blog')
      cy.get('#author').type('Matti')
      cy.get('#url').type('www.Matti.blogspot.com')
      cy.get('#submit-button').click()

    })

    it('liked blog is first on the list', function () {
      cy.get('.blog').first().should('contain', 'Jarin Auto Blog')

      cy.get('.blog')
        .should('have.length',2)
        .each((el, i, list) => {
          cy.wrap(el).contains('view').click()
          if (i === 1) {
            cy.wrap(el).contains('like').click()
          }
        })
      cy.wait(1000)
      
      cy.get('.blog').first().should('contain', 'Matin Kukka Blog')
    })
  })
})