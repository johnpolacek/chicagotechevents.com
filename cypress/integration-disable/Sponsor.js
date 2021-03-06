import 'cypress-file-upload'
import getSponsorMarkdown from '../../src/functions/add-sponsor/getSponsorMarkdown'
import { getValidSponsorData, getValidSponsorDataNextWeek } from '../support/helpers' 
import { deferred } from '../support/helpers'

describe('Sponsor', function() {

  it('can visit sponsor page', function() {
    cy.visit('/sponsor')
    cy.contains('Sponsor').should('be.visible')
    cy.contains('CHOOSE A WEEK').should('be.visible')
  })

  // it('cannot reserve an existing sponsor', function() {
  //   // cy.exec move any existing sponsor md file into temp then back
  //   cy.exec('mkdir ./temp')
  //   cy.exec('mv ./content/eventslist/sponsors/*.md ./temp')

  //   // wait for rebuild
  //   cy.wait(2000)

  //   // verify number of sponsorships available
  //   cy.visit('/sponsor')
  //   cy.get('input[name="sponsorWeek"]').should('have.length', 52)

  //   const sponsorData = getValidSponsorDataNextWeek()

  //   // set sponsor date for next week

  //   const sponsorFileName = 'content/eventslist/sponsors/'+sponsorData.id+'.md'
  //   cy.writeFile(sponsorFileName, getSponsorMarkdown(sponsorData))

  //   // wait for rebuild
  //   cy.wait(2000)

  //   cy.reload()
  //   cy.get('input[name="sponsorWeek"]').should('have.length', 52)

  //   cy.exec('mv ./temp/*.md ./content/eventslist/sponsors')
  //   cy.exec('rmdir ./temp')

  //   // wait for rebuild
  //   cy.wait(2000)
  // })


  // it('ad when inactive shows promo', function() {
  //   // cy.exec move any existing sponsor md file into temp then back
  //   cy.exec('mkdir ./temp')
  //   cy.exec('mv ./content/eventslist/sponsors/*.md ./temp')

  //   // wait for rebuild
  //   cy.wait(2000)

  //   cy.visit('/')
  //   cy.get('p')
  //     .contains('This Space Available')
  //     .should('be.visible')
  //   cy.get('a')
  //     .contains('Become a Sponsor')
  //     .click()
  //   cy.location('pathname', { timeout: 10000 }).should('include', '/sponsor')
  //   cy.wait(2000)
  //   cy.get('h2')
  //     .contains('Sponsor')
  //     .should('be.visible')
  //   cy.get('h3')
  //     .contains('CHOOSE A WEEK')
  //     .should('be.visible')

  //   cy.exec('mv ./temp/*.md ./content/eventslist/sponsors')
  //   cy.exec('rmdir ./temp')

  //   // wait for rebuild
  //   cy.wait(2000)
  // })

  // it('ad shows when active', function() {

  //   // cy.exec move any existing sponsor md file into temp then back
  //   cy.exec('mkdir ./temp')
  //   cy.exec('mv ./content/eventslist/sponsors/*.md ./temp')
    
  //   // need handle when there is an active sponsor is prod
  //   const sponsorData = getValidSponsorData()
  //   const sponsorFileName = 'content/eventslist/sponsors/'+sponsorData.id+'.md'
  //   cy.writeFile(sponsorFileName, getSponsorMarkdown(sponsorData))

  //   // wait for rebuild
  //   cy.wait(2000)

  //   cy.visit('/')
  //   cy.get('p')
  //     .contains('This Space Available')
  //     .should('not.exist')

  //   cy.get('a')
  //     .contains('Acme Co')
  //     .should('be.visible')

  //   cy.visit('/email')
  //   cy.get('p')
  //     .contains('This Space Available')
  //     .should('not.exist')

  //   cy.get('a')
  //     .contains('Acme Co')
  //     .should('be.visible')

  //   cy.exec('rm ./'+sponsorFileName)
  //   cy.exec('mv ./temp/*.md ./content/eventslist/sponsors')
  //   cy.exec('rmdir ./temp')

  //   // wait for rebuild
  //   cy.wait(2000)
  // })

  // it('can preview and create ad', function() {
  //   // see Admin tests for how to stub out api response - /.netlify/functions/add-sponsor/

  //   this.fetchAddSponsorDeferred = deferred()
    
  //   cy.visit('/sponsor/', {
  //     onBeforeLoad(win) {
  //       let s = cy.stub(win, 'fetch')
  //       s.withArgs('/.netlify/functions/add-sponsor/')
  //         .as('fetchAddSponsor')
  //         .returns(this.fetchAddSponsorDeferred.promise)
  //     },
  //   })

  //   cy.get('#sponsorWeek1').click()

  //   cy.get('#previewNewsletter').should('be.visible')
  //   cy.get('#previewSite').should('not.be.visible')
  //   cy.get('#previewSocial').should('not.be.visible')
  //   cy.get('input[name=sponsorName]').type('Awesome Company')
  //   cy.get('input[name=sponsorLink]').type('https://awesomecompany.com')

  //   cy.get('#sponsorImageUploadPreview').should('not.be.visible')

  //   const fileName = 'sponsor-image-example.png'
  //   cy.fixture(fileName).then(fileContent => {
  //     cy.get('input[name=sponsorImage]').upload({ fileContent, fileName, mimeType: 'image/png' })
  //   })

  //   // verify preview
  //   cy.get('#sponsorImageUploadPreview').should('be.visible')
  //   cy.get('#previewNewsletter').find('a[href="https://awesomecompany.com"]').contains('Awesome Company').should('be.visible')
  //   cy.get('#previewNewsletter').find('#sponsorImageLink').find('img#sponsorImagePreviewNewsletter').should('be.visible')

  //   cy.get('#sponsorPreview').find('button').contains('Website').click()
  //   cy.get('#previewNewsletter').should('not.be.visible')
  //   cy.get('#previewSite').should('be.visible')
  //   cy.get('#previewSocial').should('not.be.visible')

  //   cy.get('#previewSite').find('a[href="https://awesomecompany.com"]').contains('Awesome Company').should('be.visible')
  //   cy.get('#previewSite').find('#sponsorImageLink').find('img#sponsorImagePreviewSite').should('be.visible')

  //   cy.get('#sponsorPreview').find('button').contains('Social').click()
  //   cy.get('#previewNewsletter').should('not.be.visible')
  //   cy.get('#previewSite').should('not.be.visible')
  //   cy.get('#previewSocial').should('be.visible')

  //   cy.get('#sponsorImageLink').should('not.be.visible')
  //   cy.get('#previewSocial').find('a[href="https://awesomecompany.com"]').contains('https://awesomecompany.com').should('be.visible')

  //   cy.get('#submitSponsor').click()

  //   cy.get('form').contains('Almost Done!').should('be.visible')
  //   cy.get('button').contains('Pay With Card').click()

  //   cy.wait(5000)
  //   cy.get('iframe').then($iframe => {
  //     const doc = $iframe.contents()
  //     let input = doc.find('input')[0]
  //     cy
  //       .wrap(input)
  //       .clear()
  //       .type('somebody@awesomecompany.com')
      
  //     input = doc.find('input')[1]
  //     cy
  //       .wrap(input)
  //       .type('4242')
  //       .type('4242')
  //       .type('4242')
  //       .type('4242')
      
  //     input = doc.find('input')[2]
  //     cy
  //       .wrap(input)
  //       .clear()
  //       .type('12')
  //       .type('20')

  //     input = doc.find('input')[3]
  //     cy
  //       .wrap(input)
  //       .type('123')
  //       .type('{enter}')
      
  //     cy.wait(5000)

  //     this.fetchAddSponsorDeferred.resolve({
  //       json() {
  //         return { message: 'success' }
  //       },
  //       ok: true,
  //     })

  //     cy.get('div').contains('Thanks for sponsoring!').should('be.visible')
  //   })

  // })
})
