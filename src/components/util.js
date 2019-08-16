function getMonday(offset) {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  if (typeof offset === 'number') {
    now.setDate(now.getDate() + offset * 7)
  }
  now.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7))
  return now
}

module.exports = {
  getMonday: offset => getMonday(offset),
  getWeeksInYear: () => {
    let i = 0
    const monday = getMonday()
    let weeks = []

    while (i < 52) {
      // 1 years
      weeks.push(monday.toISOString())
      monday.setDate(monday.getDate() + 7)
      i++
    }
    return weeks
  },
  getEventDateString: (startDate, startTime, endDate, endTime) => {
    return startDate !== endDate
      ? `${startDate
          .split(',')[0]
          .replace(/\s0+/g, ' ')} at ${startTime.replace(
          ':00',
          ''
        )} to ${endDate
          .split(',')[0]
          .replace(/\s0+/g, ' ')} at ${endTime.replace(':00', '')}`
      : `${startDate
          .split(',')[0]
          .replace(/\s0+/g, ' ')} from ${startTime.replace(
          ':00',
          ''
        )} to ${endTime.replace(':00', '')}`
  },
  meetupDataToEventData: meetupData => {
    const startDate = meetupData.local_date + ' 00:00'
    let endDate = new Date(startDate)
    const numDays = Math.floor(meetupData.duration / 3600000 / 24)
    if (numDays > 0) {
      endDate.setDate(endDate.getDate() + numDays)
    }
    endDate = endDate.toISOString().split('T')[0]

    return {
      eventName: meetupData.name,
      description:
        new DOMParser().parseFromString(meetupData.description, 'text/html')
          .body.textContent || '',
      linkURL: meetupData.link,
      cost:
        meetupData.fee && meetupData.fee.amount
          ? meetupData.fee.amount.toString()
          : 'FREE',
      startDate: startDate,
      startTime: timeToAmPm(meetupData.local_time),
      endDate: endDate,
      endTime: getAmPmFromTimestamp(
        meetupData.time + meetupData.duration + meetupData.utc_offset
      ),
      locationName: meetupData.venue.name,
      locationStreet: meetupData.venue.address_1 || '',
      locationCity: meetupData.venue.city,
      authorName: 'Meetup Group: ' + meetupData.group.name,
    }
  },
  eventbriteDataToEventData: eventbriteData => {
    return {
      eventName: eventbriteData.name.text,
      description: eventbriteData.description.text,
      linkURL: eventbriteData.url.split('?')[0],
      cost: (tickets => {
        let cost = ''
        tickets.forEach(ticket => {
          if (ticket.free) {
            if (cost.includes('FREE')) {
              if (cost === '') {
                cost = 'FREE'
              } else {
                cost = 'FREE, ' + cost
              }
            }
          } else if (ticket.cost !== undefined) {
            if (cost !== '') {
              cost += ', '
            }
            cost += ticket.cost.display.replace('.00', '')
          }
        })
        if (cost === '') {
          cost = 'FREE'
        }
        return cost
      })(eventbriteData.ticket_classes),
      startDate: new Date(eventbriteData.start.local).toISOString(),
      startTime: getAmPmFromDateString(eventbriteData.start.local),
      endDate: new Date(eventbriteData.end.local).toISOString(),
      endTime: getAmPmFromDateString(eventbriteData.end.local),
      locationName:
        eventbriteData.venue.name === eventbriteData.venue.address.address_1
          ? ''
          : eventbriteData.venue.name,
      locationStreet: eventbriteData.venue.address.address_1 || '',
      locationCity: eventbriteData.venue.city,
      authorName: 'Eventbrite Org Id: ' + eventbriteData.organization_id,
    }
  },
}

const timeToAmPm = time => {
  const hour = parseInt(time.split(':')[0])
  return (hour % 12) + ':' + time.split(':')[1] + (hour > 12 ? 'pm' : 'am')
}

const getAmPmFromDateString = datestring => {
  const time = datestring.split('T')[1]
  return timeToAmPm(time.split(':')[0] + ':' + time.split(':')[1])
}

const getAmPmFromTimestamp = timestamp => {
  const time = new Date(timestamp).toISOString().split('T')[1]
  return timeToAmPm(time.split(':')[0] + ':' + time.split(':')[1])
}
