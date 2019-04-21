import getEventMarkdown from '../../src/functions/add-event/getEventMarkdown'
import { getValidEventData } from '../support/helpers'

describe('API', function() {
  it('can generate markdown from valid event data', function() {
  	const submitDate = new Date().toISOString()
  	const validEventData = {...getValidEventData(), ...{date: submitDate} }
  	const validEventDataMarkdownOutput = '---\ntitle: "Test Event"\ndate: "'+submitDate+'"\nstartDate: "Wed May 01 2019 00:00:00 GMT-0500 (Central Daylight Time)"\nstartTime: "5:00pm"\nendDate: "Wed May 01 2019 00:00:00 GMT-0500 (Central Daylight Time)"\nendTime: "7:00pm"\nlocationName: "1871 Chicago"\nlocationStreet: "222 W Merchandise Mart Plaza #1212"\nlocationCity: "Chicago"\ncost: "FREE"\neventUrl: "https://eventbrite.com/test-event"\n\n---\n\nThis is not a real event. It is just for testing\n\n'
    cy.expect(getEventMarkdown(validEventData)).to.equal(validEventDataMarkdownOutput)
  })
})