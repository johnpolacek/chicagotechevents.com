import { deferred, getMeetupResults } from '../support/helpers'

describe('Admin', function() {
  beforeEach(function() {
    this.fetchSigninDeferred = deferred()
    this.fetchMeetupDeferred = deferred()
    this.fetchEventbriteDeferred = deferred()
    this.fetchAddEventDeferred = deferred()
    cy.visit('/admin', {
      onBeforeLoad(win) {
        let s = cy.stub(win, 'fetch')
        s.withArgs('/.netlify/functions/admin/')
          .as('fetchEmailAddress')
          .returns(this.fetchSigninDeferred.promise)
        s.withArgs('/.netlify/functions/get-meetups/')
          .as('fetchMeetup')
          .returns(this.fetchMeetupDeferred.promise)
        s.withArgs('/.netlify/functions/get-eventbrite/')
          .as('fetchMeetup')
          .returns(this.fetchEventbriteDeferred.promise)
        s.withArgs('/.netlify/functions/add-event/')
          .as('fetchAddEvent')
          .returns(this.fetchAddEventDeferred.promise)
      },
    })
  })

  it('can get meetups and submit', function() {
    cy.get('#adminCode').type('123') // not the real admin code, just for testing ;)
    cy.get('input[type=submit]').click()
    this.fetchSigninDeferred.resolve({
      json() {
        return { message: 'success' }
      },
      ok: true,
    })
    cy.get('#eventSearch').should('have.value', 'tech')
    cy.get('input[value=SEARCH]').click()
    this.fetchMeetupDeferred.resolve({
      json() {
        return getMeetupResults(0)
      },
      ok: true,
    })
    cy.wait(1000)
    cy.get('div').contains('The WTF Lounge').should('be.visible')
    cy.get('a[href="https://www.meetup.com/Women-Tech-Founders-WTF-of-Chicago/events/258446391/"]').should('be.visible')
    cy.get('#eventsList').contains('Add Event').first().click()
    cy.get('#submitEvent').click()
    cy.get('@fetchAddEvent').should('not.be.called') // requires address
    cy.get('input[name=locationStreet]').type('222 W Merchandise Mart Plaza')
    cy.get('#submitEvent').click()
    this.fetchAddEventDeferred.resolve({
      json() {
        return {
          message: 'success',
          url: 'https://github.com/johnpolacek/chicagotechevents.com/pull/31'
        }
      },
      ok: true,
    })

    cy.get('@fetchAddEvent').should('be.called')
    cy.get('div')
      .contains('Thanks for sending your event!')
      .should('be.visible')
    cy.get('#reviewLink')
      .find('a')
      .should('have.attr', 'href', 'https://github.com/johnpolacek/chicagotechevents.com/pull/31/files')
  })

  // it('can get eventbrite events and submit', function() {
  //   cy.get('#adminCode').type('123') // not the real admin code, just for testing ;)
  //   cy.get('input[type=submit]').click()
  //   this.fetchSigninDeferred.resolve({
  //     json() {
  //       return { message: 'success' }
  //     },
  //     ok: true,
  //   })
  //   cy.get('#searchMode').click()
  //   cy.get('#eventSearch').should('have.value', 'tech')
  //   cy.get('input[value=SEARCH]').click()
  //   this.fetchEventbriteDeferred.resolve({
  //     json() {
  //       return getEventbriteResults(0)
  //     },
  //     ok: true,
  //   })
  //   cy.get('div').contains('The WTF Lounge').should('be.visible')
  //   cy.get('a[href="https://www.meetup.com/Women-Tech-Founders-WTF-of-Chicago/events/258446391/"]').should('be.visible')
  //   cy.get('#meetupEvents').contains('Add Event').first().click()
  //   cy.get('#submitEvent').click()
  //   cy.get('@fetchAddEvent').should('not.be.called') // requires address
  //   cy.get('input[name=locationStreet]').type('222 W Merchandise Mart Plaza')
  //   cy.get('#submitEvent').click()
  //   this.fetchAddEventDeferred.resolve({
  //     json() {
  //       return {
  //         message: 'success',
  //         url: 'https://github.com/johnpolacek/chicagotechevents.com/pull/31'
  //       }
  //     },
  //     ok: true,
  //   })

  //   cy.get('@fetchAddEvent').should('be.called')
  //   cy.get('div')
  //     .contains('Thanks for sending your event!')
  //     .should('be.visible')
  //   cy.get('#reviewLink')
  //     .find('a')
  //     .should('have.attr', 'href', 'https://github.com/johnpolacek/chicagotechevents.com/pull/31/files')
  // })
})
