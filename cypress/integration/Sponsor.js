import getSponsorMarkdown from '../../src/functions/add-sponsor/getSponsorMarkdown'
import { getValidSponsorData } from '../support/helpers' 
import { deferred } from '../support/helpers'

describe('Sponsor', function() {
  it('ad when inactive shows promo', function() {
    // cy.exec move any existing sponsor md file into temp then back
    // https://askubuntu.com/questions/259744/to-move-all-file-with-certain-common-string-except-the-extension-of-the-file-to

    cy.visit('/')
    cy.get('p')
      .contains('This Space Available')
      .should('be.visible')
    cy.get('a')
      .contains('Become a Sponsor')
      .click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/sponsor')
    cy.wait(2000)
    cy.get('h2')
      .contains('Sponsor')
      .should('be.visible')
    cy.get('h3')
      .contains('CHOOSE A WEEK')
      .should('be.visible')
  })

  it('ad shows when active', function() {
    
    // need handle when there is an active sponsor is prod
    const sponsorData = getValidSponsorData()
    cy.writeFile('content/eventslist/sponsors/'+sponsorData.id+'.md', getSponsorMarkdown(sponsorData))

    cy.visit('/')
    cy.get('p')
      .contains('This Space Available')
      .should('not.exist')

    cy.get('a')
      .contains('Acme Co')
      .should('be.visible')

    cy.exec('rm ./content/eventslist/sponsors/'+sponsorData.id+'.md')

  })

  it('can create ad', function() {
    // see Admin tests for how to stub out api response
  })
})
