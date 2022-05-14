describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Superuser',
      username: 'mluukai',
      password: 'salainen',
    }
    cy.createUser(user)
  })

  it('login form is shown', function () {
    cy.contains('login').click()
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.get('#user-login').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('input:first').type('mluukai')
      cy.get('input:last').type('salainen')
      cy.get('#user-login').click()
      cy.contains('Superuser logged-in')
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#user-login').click()

      cy.get('#notification').contains('Wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#notification').should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Superuser logged-in')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukai', password: 'salainen' })
      const blog = {
        title: 'A new blog',
        author: 'Author',
        url: 'httttttttp',
      }
      cy.createBlog(blog)
    })
    it('A blog can be created, default like will be 0', function () {
      cy.get('.blog-title').contains('A new blog')
      cy.get('.blog-author').contains('Author')
      cy.get('.blog-url').contains('httttttttp')
      cy.get('.blog-likes').contains('0')
    })
    it('A user can like a blog', function () {
      cy.get('.blog-likes').contains('0')
      cy.get('.button-view').click()
      cy.get('.button-like').click()
      cy.get('.blog-likes').contains('1')
    })
    it('A user delete a blog', function () {
      cy.get('.button-view').click()
      cy.get('.button-delete').click()
      cy.get('html').should('not.contain', 'A new blog')
    })
  })
  it('blogs are ordered with most likes first', function () {
    cy.login({ username: 'mluukai', password: 'salainen' })
    const blog1 = {
      title: 'A new blog 1',
      author: 'Author',
      url: 'httttttttp',
      likes: 1,
    }
    const blog2 = {
      title: 'A new blog 2',
      author: 'Author',
      url: 'httttttttp',
      likes: 2,
    }
    const blog3 = {
      title: 'A new blog 3',
      author: 'Author',
      url: 'httttttttp',
      likes: 3,
    }
    cy.createBlog(blog1)
    cy.createBlog(blog2)
    cy.createBlog(blog3)
    cy.get('.button-view').click({ multiple: true })
    cy.get('.blog-item').first().contains('A new blog 3')
    cy.get('.blog-item').first().should('not.contain', 'A new blog 2')
    cy.get('.blog-item').first().should('not.contain', 'A new blog 1')
  })
})
