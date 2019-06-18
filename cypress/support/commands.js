// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { getValidEventData } from './helpers'

const API_URL_ADD_EVENT = '/.netlify/functions/add-event/'

// Fixes issue where service workers are not cleared by Cypress Test Runner - https://github.com/cypress-io/cypress/issues/702
Cypress.Commands.add('unregisterServiceWorkers', test => {
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister()
      })
    })
  }
})

Cypress.Commands.add('completeEventForm', data => {
  const eventData = { ...getValidEventData(), ...data }

  // fill out the form with eventData
  Object.keys(eventData)
    .filter(
      field =>
        field !== 'startTime' && field !== 'endTime' && field !== 'endDate'
    )
    .forEach(field => {
      // startTime and endTime have a default and not possible to set to empty value
      // endDate is autofilled by choosing startDate
      if (field === 'startDate') {
        if (eventData.startDate !== '' && eventData.endDate !== '') {
          cy.get('#datepicker-startDate').click()
          cy.get('button.react-datepicker__navigation--next').click()
          cy.get('.react-datepicker__day--001')
            .first()
            .click()
        }
      } else if (eventData[field] !== '') {
        cy.get('input[name=' + field + '],textarea[name=' + field + ']').type(
          eventData[field]
        )
      }
    })

  if (data.startTime && data.startTime !== '') {
    cy.get('#timepicker-startDate-hours').select(data.startTime.split(':')[0])
    cy.get('#timepicker-startDate-minutes').select(
      data.startTime.split(':')[1].substring(0, 2)
    )
    cy.get('#timepicker-startDate-period').select(
      data.startTime.split(':')[1].substring(2)
    )
  }

  if (data.endTime && data.endTime !== '') {
    cy.get('#timepicker-endDate-hours').select(data.endTime.split(':')[0])
    cy.get('#timepicker-endDate-minutes').select(
      data.endTime.split(':')[1].substring(0, 2)
    )
    cy.get('#timepicker-endDate-period').select(
      data.endTime.split(':')[1].substring(2)
    )
  }

  if (eventData.endDate !== '' && eventData.endDate !== eventData.startDate) {
    cy.get('#datepicker-endDate').click()
    cy.get('button.react-datepicker__navigation--next').click()
    cy.get('.react-datepicker__day--002')
      .first()
      .click()
  }

  // submit the form
  cy.get('#submitEvent').click()

  // if no data passed in, is valid so verify sending state
  if (Object.keys(data).length === 0) {
    cy.get('div')
      .contains('Sending event...')
      .should('be.visible')
  }
})

Cypress.Commands.add('verifySubmitSuccess', test => {
  const pullRequestUrl =
    'https://github.com/johnpolacek/chicagotechevents.com/pull/31'

  test.fetchAddEventDeferred.resolve({
    json() {
      return {
        message: 'success',
        url: pullRequestUrl,
      }
    },
    ok: true,
  })
  cy.get('@fetchAddEvent').should('be.calledWith', API_URL_ADD_EVENT)
  cy.get('div')
    .contains('Thanks for sending your event!')
    .should('be.visible')
  cy.get('#reviewLink')
    .find('a')
    .should('have.attr', 'href', pullRequestUrl + '/files')
})

Cypress.Commands.add('verifySubmitError', test => {
  // return an error message from the stub
  test.fetchAddEventDeferred.resolve({
    json() {
      return { message: 'error' }
    },
    ok: true,
  })
  cy.get('@fetchAddEvent').should('be.calledWith', API_URL_ADD_EVENT)
  cy.get('div')
    .contains('Oops! There was a problem.')
    .should('be.visible')
})
