module.exports = {
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
}
