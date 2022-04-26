describe('Submission', () => {

  it('should render the new shortened URL onto the page when a user fills out and submits the form', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls',
      fixture: 'postedUrl.json'
    ).as('postUrl')
  });

})
