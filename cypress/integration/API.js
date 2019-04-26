import getEventMarkdown from '../../src/functions/add-event/getEventMarkdown'
import { getValidEventData, getDefaultEventDate } from '../support/helpers'
import { DateTime } from 'luxon'

describe('API', function() {
  it('can generate markdown from valid event data', function() {
    const submitDate = DateTime.local()
      .setZone('America/Chicago')
      .toString()
    const eventDate = getDefaultEventDate()
    const validEventData = { ...getValidEventData(), ...{ date: submitDate } }
    const validEventDataMarkdownOutput =
      '---\ntitle: "Test Event"\ndate: "' +
      submitDate +
      '"\nstartDate: "' +
      eventDate +
      '"\nstartTime: "5:00pm"\nendDate: "' +
      eventDate +
      '"\nendTime: "7:00pm"\nlocationName: "1871 Chicago"\nlocationStreet: "222 W Merchandise Mart Plaza #1212"\nlocationCity: "Chicago"\ncost: "FREE"\neventUrl: "https://eventbrite.com/test-event"\n\n---\n\nThis is not a real event. It is just for testing\n\n'
    cy.expect(getEventMarkdown(validEventData)).to.equal(
      validEventDataMarkdownOutput
    )
  })
})
