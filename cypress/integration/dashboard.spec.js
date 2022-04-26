describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      fixture: 'urls.json'
    }).as('getUrls')

    cy.visit('http://localhost:3000/')
  })

  it('should display the page title and the existing shortened URLs', () => {
    cy.get('h1').contains('URL Shortener')
  });

  it.skip('should display the Form with the proper inputs', () => {

  });

  it.skip('should be able to fill out the form, and the inputs reflect the typed values', () => {

  });

})
