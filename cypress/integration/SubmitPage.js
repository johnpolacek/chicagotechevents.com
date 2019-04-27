import {
  deferred,
  getValidEventData,
  getDefaultEventDate,
} from '../support/helpers'

describe('Submit Page', function() {
  it('can be accessed from homepage', function() {
    cy.visit('/')
    cy.get('a')
      .contains('SUBMIT EVENT')
      .click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/submit')
    cy.get('form input[value="Submit Event"]', { timeout: 10000 }).should(
      'exist'
    )
  })

  describe('when submitting event', function() {
    // stub the response from the api
    beforeEach(function() {
      this.fetchAddEventDeferred = deferred()
      cy.visit('/submit', {
        onBeforeLoad(win) {
          cy.stub(win, 'fetch')
            .as('fetchAddEvent')
            .returns(this.fetchAddEventDeferred.promise)
        },
      })
    })

    it('can submit valid event data', function() {
      cy.completeEventForm({})
      cy.verifySubmitSuccess(this)
    })

    it('requires all fields', () => {
      const validFormData = getValidEventData()
      Object.keys(validFormData).forEach(key => {
        // startTime and endTime have a default and not possible to set to empty value
        if (key != 'startTime' && key != 'endTime') {
          cy.reload()
          let formDataWithMissingValue = { ...validFormData }
          formDataWithMissingValue[key] = ''
          cy.completeEventForm(formDataWithMissingValue)
          cy.get('@fetchAddEvent').should('not.be.called')
        }
      })
    })

    it('requires a valid email', function() {
      cy.completeEventForm({ authorEmail: 'abc' })
      cy.get('@fetchAddEvent').should('not.be.called')
    })

    it('can handle error response', function() {
      cy.completeEventForm({})
      cy.verifySubmitError(this)
    })

    it('can change hours of event', function() {
      cy.completeEventForm({ startTime: '12:00pm', endTime: '1:30pm' })
      cy.verifySubmitSuccess(this)
    })

    it('can make multiple day event', function() {
      let endDate = new Date(getValidEventData())
      endDate.setDate(endDate.getDate() + 1)
      cy.completeEventForm({ endDate })
      cy.verifySubmitSuccess(this)
    })
  })
})
