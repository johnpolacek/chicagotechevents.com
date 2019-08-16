import getSponsorMarkdown from '../../src/functions/add-sponsor/getSponsorMarkdown'
import { deferred } from '../support/helpers'

describe('Sponsor', function() {

  it('ad when inactive shows promo', function() {
    // cy.exec move any existing sponsor md file into temp then back
    // https://askubuntu.com/questions/259744/to-move-all-file-with-certain-common-string-except-the-extension-of-the-file-to

    cy.visit('/')
    cy.get('p').contains('This Space Available').should('be.visible')
    cy.get('a').contains('Become a Sponsor').click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/sponsor')
    cy.wait(2000)
    cy.get('h2').contains('Sponsor').should('be.visible')
    cy.get('h3').contains('CHOOSE A WEEK').should('be.visible') 
  })

  it('ad shows when active', function() {
    // cy.writeFile md file into content
    // cy.writeFile('path/to/message.txt', 'Hello World')
    // what happens when there is already a file there
  })

  it('can create ad', function() {
    // see Admin tests for how to stub out api response
  })

})
