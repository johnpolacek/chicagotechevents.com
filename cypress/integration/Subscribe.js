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

  describe('when subscription succeeds', function() {
    // stub the response from the api
    beforeEach(function() {
      this.fetchSubscribeDeferred = deferred()
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'fetch')
            .as('fetchSubscribe')
            .returns(this.fetchSubscribeDeferred.promise)
        },
      })
    })

    it('shows success message', function() {
      cy.get('#subscribeEmail').type('johnpolacek@hotmail.com')
      cy.get('#submitSubscribe').click()
      this.fetchSubscribeDeferred.resolve({
        json() {
          return {
            message: 'success',
          }
        },
        ok: true,
      })
      cy.get('div')
        .contains('All set. Thanks for subscribing!')
        .should('be.visible')
    })
  })
})
