import {
  deferred,
  getValidEventData,
  getDefaultEventDate,
} from '../support/helpers'

describe('Subscribe', function() {
  it('when subscription fails shows error message', function() {
    cy.visit('/')
    cy.get('#subscribeEmail').type('asdf@asdf.com')
    cy.get('#submitSubscribe').click()
    cy.get('div')
      .contains('Sorry, there was an error. Maybe try again?')
      .should('be.visible')
  })

  it('requires valid email', () => {
    cy.visit('/')
    cy.get('#subscribeEmail').type('asdf@')
    cy.get('#submitSubscribe').click()
    cy.get('div')
      .contains('All set. Thanks for subscribing!')
      .should('not.be.visible')
  })
  
})
