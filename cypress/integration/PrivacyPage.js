
describe('Privacy Page', function() {

  before(function() {
    cy.unregisterServiceWorkers()
  })

  it('can be accessed from homepage', function() {
    cy.visit('/')
    cy.get('a')
      .contains('Privacy Policy')
      .click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/privacy')
    cy.wait(2000)
    cy.get('h2').contains('Privacy Policy').should('be.visible')
  })

  it('can be visited directly', function() {
    cy.visit('/privacy')
    cy.location('pathname', { timeout: 10000 }).should('include', '/privacy')
    cy.get('h2').contains('Privacy Policy').should('be.visible')
  })
})
