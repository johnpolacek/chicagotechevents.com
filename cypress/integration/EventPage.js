describe('Event Page', function() {
  before(function() {
    cy.unregisterServiceWorkers()
  })

  it('can be accessed from homepage', function() {
    cy.visit('/')
    // click first link
    cy.get('h3 a').eq(0).click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/20') // starts with year. this will break in the year 2100
    cy.wait(2000)
    cy.get('h2').should('be.visible')
  })

})
