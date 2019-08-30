import getEventMarkdown from '../../src/functions/add-event/getEventMarkdown'
import getSponsorMarkdown from '../../src/functions/add-sponsor/getSponsorMarkdown'
import {
  getValidEventData,
  getValidSponsorData,
  getDefaultEventDate,
} from '../support/helpers'
import { DateTime } from 'luxon'

describe('API', function() {
  it('can generate event markdown from valid event data', function() {
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
      '"\nendTime: "7:00pm"\nlocationName: "1871 Chicago"\nlocationStreet: "222 W Merchandise Mart Plaza #1212"\nlocationCity: "Chicago"\nlocationState: "IL"\ncost: "FREE"\neventUrl: "https://eventbrite.com/test-event"\n\n---\n\nThis is not a real event. It is just for testing\n\n'
    cy.expect(getEventMarkdown(validEventData)).to.equal(
      validEventDataMarkdownOutput
    )
  })

  it('can generate sponsor markdown from valid sponsor data', function() {
    const validSponsorData = {
      id: '2019-08-26-acme-co',
      date: new Date().toISOString(),
      name: 'Acme Co',
      week: '2019-08-26',
      link: 'https://chicagotechevents.com',
    }

    const validSponsorDataMarkdownOutput =
      '---\ntitle: "' +
      validSponsorData.name +
      '"\ndate: "' +
      validSponsorData.date +
      '"\nsponsorDate: "' +
      validSponsorData.week +
      '"\neventUrl: "' +
      validSponsorData.link +
      '"\n\n---\n\n' +
      validSponsorData.name +
      '\n\n<a href="' +
      validSponsorData.link +
      '"><img src="https://docqet-images.s3.us-east-2.amazonaws.com/sponsors/' +
      validSponsorData.id +
      '.jpg" /></a>\n\n'

    cy.expect(getSponsorMarkdown(validSponsorData)).to.equal(
      validSponsorDataMarkdownOutput
    )
  })
})
