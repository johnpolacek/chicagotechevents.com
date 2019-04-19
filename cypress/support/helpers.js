const defaultEventDate = () => {
  const now = new Date()
  if (now.getMonth() == 11) {
    return new Date(now.getFullYear() + 1, 0, 1)
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1)
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
    authorName: 'Joe Tester',
    authorEmail: 'joe@test.com',
    startDate: defaultEventDate,
    startTime: '5:00pm',
    endDate: defaultEventDate,
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
  }
}