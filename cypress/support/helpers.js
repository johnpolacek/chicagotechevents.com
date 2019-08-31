import { DateTime } from 'luxon'
import { MEETUP_RESPONSE, EVENTBRITE_RESPONSE } from './responses'
import { getMonday } from '../../src/components/util'

const defaultEventDate = () => {
  const now = DateTime.local().setZone('America/Chicago')
  return now
    .plus({ months: 1 })
    .set({ day: 1 })
    .toLocaleString(DateTime.DATETIME_FULL)
}

const meetupResultSet = offset => {
  const nextMonth = DateTime.local()
    .setZone('America/Chicago')
    .plus({ months: 1 })
    .set({ day: 1, hour: 5, minute: 0 })
  const year = nextMonth.year
  const month = nextMonth.month
  let data = MEETUP_RESPONSE
  for (let i = 0; i < data.response.events.length; i++) {
    const eventTime = nextMonth.plus({ days: i })
    data.response.events[i].time = eventTime.valueOf()
    data.response.events[i].local_date = eventTime.toISODate()
    data.response.events[i].local_time = eventTime.toFormat('HH:mm')
  }
  return data
}

const eventbriteResultSet = offset => {
  const nextMonth = DateTime.local()
    .setZone('America/Chicago')
    .plus({ months: 1 })
    .set({ day: 1, hour: 5, minute: 0 })
  const year = nextMonth.year
  const month = nextMonth.month
  let data = EVENTBRITE_RESPONSE
  return data
}

const getSponsorData = offset => {
  const sponsorDate = getMonday(offset).toISOString()
  return {
    id: sponsorDate.split('T')[0]+'-acme-co',
    name: 'Acme Co',
    date: new Date().toISOString(),
    week: sponsorDate,
    link: 'https://chicagotechevents.com',
  }
}

module.exports = {
  getValidEventData: () => ({
    eventName: 'Test Event',
    description: 'This is not a real event. It is just for testing',
    linkURL: 'https://eventbrite.com/test-event',
    cost: 'FREE',
    locationName: '1871 Chicago',
    locationStreet: '222 W Merchandise Mart Plaza #1212',
    locationCity: 'Chicago',
    authorName: 'Joe Tester',
    startDate: defaultEventDate(),
    startTime: '5:00pm',
    endDate: defaultEventDate(),
    endTime: '7:00pm',
  }),
  getValidSponsorData: () => {
    return getSponsorData(-1)
  },
  getValidSponsorDataNextWeek: () => {
    return getSponsorData(1)
  },
  getDefaultEventDate: () => {
    return defaultEventDate()
  },
  getMeetupResults: offset => {
    return meetupResultSet(offset)
  },
  getEventbriteResults: offset => {
    return eventbriteResultSet(offset)
  },
  deferred: () => {
    const deferred = {}
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    return deferred
  },
}
