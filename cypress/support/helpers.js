import { DateTime } from 'luxon'

const defaultEventDate = () => {
  const now = DateTime.local().setZone('America/Chicago')
  return now.plus({months:1}).set({day:1}).toLocaleString(DateTime.DATETIME_FULL)
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
    authorEmail: 'joe@test.com',
    startDate: defaultEventDate(),
    startTime: '5:00pm',
    endDate: defaultEventDate(),
    endTime: '7:00pm',
  }),
  getDefaultEventDate: () => {
    return defaultEventDate()
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
