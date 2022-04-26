describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      fixture: 'postedUrl.json'
    }).as('postUrl')

    cy.intercept('http://localhost:3001/api/v1/urls', {
      fixture: 'urls.json'
    }).as('getUrls')

    cy.visit('http://localhost:3000/')
  })

  it('should display the page title and the existing shortened URLs', () => {
    cy.get('h1').contains('URL Shortener')
    cy.get('.url').within(url=> {
      cy.get('h3').contains('Awesome photo')
      cy.get('a').contains('http://localhost:3001/useshorturl/1')
      cy.get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    });
  });

  it('should display the Form with the proper inputs', () => {
    cy.get('form').within(form => {
      cy.get('input').first().invoke('attr', 'name').should('eq', 'title')
      cy.get('input').last().invoke('attr', 'name').should('eq', 'urlToShorten')
    });
  });

  it('should be able to fill out the form, and the inputs reflect the typed values', () => {
    cy.get('form input:first').type('Test Title')
    cy.get('form input:last').type('testurl.com/testme')

    cy.get('form').within(form => {
      cy.get('input').first().invoke('attr', 'value').should('eq', 'Test Title')
      cy.get('input').last().invoke('attr', 'value').should('eq', 'testurl.com/testme')
    })
  });


  it('should render the new shortened URL onto the page when a user fills out and submits the form', () => {
    cy.get('form input:first').type('Awesome photo')
    cy.get('form input:last').type('https://images.unsplash.com/photo...')

    cy.get('form button').click()
    cy.get('.url').should('have.length', 2)
    cy.get('.url:last a').contains('http://localhost:3001/useshorturl/2')
  });

  it.skip('should render an error if an input is empty on submit', () => {
    cy.get('form button').click()
    cy.get('.error').contains('Please fill out both fields.')
  })
})
