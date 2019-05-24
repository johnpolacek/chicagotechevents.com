import {
  deferred,
  getMeetupResults,
} from '../support/helpers'

describe('Admin', function() {
  beforeEach(function() {
    this.fetchSigninDeferred = deferred()
    this.fetchMeetupDeferred = deferred()
    cy.visit('/admin', {
      onBeforeLoad(win) {
        let s = cy.stub(win, 'fetch');
        s.withArgs('/.netlify/functions/admin/')
          .as('fetchEmailAddress')
          .returns(this.fetchSigninDeferred.promise)
        s.withArgs('/.netlify/functions/get-meetups/')
          .as('fetchMeetup')
          .returns(this.fetchMeetupDeferred.promise)          
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
    cy.get('#meetupSearch').should('have.value', 'tech')
    cy.get('input[value=SEARCH]').click()
    this.fetchMeetupDeferred.resolve({
      json() {
        return getMeetupResults(0)
      },
      ok: true,
    })
    cy.wait(2000)
  })

  // it('can load more meetups and submit', function() {
    
  // })
  
})
