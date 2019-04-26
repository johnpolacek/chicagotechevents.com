import React from 'react'
import PropTypes from 'prop-types'
import { P } from 'styled-system-html'

const getEventDateString = (startDate, startTime, endDate, endTime) => {
  return startDate !== endDate
    ? `${startDate.split(',')[0].replace(/\s0+/g, ' ')} at ${startTime.replace(
        ':00',
        ''
      )} to ${endDate.split(',')[0].replace(/\s0+/g, ' ')} at ${endTime.replace(
        ':00',
        ''
      )}`
    : `${startDate
        .split(',')[0]
        .replace(/\s0+/g, ' ')} from ${startTime.replace(
        ':00',
        ''
      )} to ${endTime.replace(':00', '')}`
}

const EventDate = props => (
  <>
    <P color="red" fontStyle="italic" fontWeight="bold" fontSize={0} mb={2}>
      {getEventDateString(
        props.startDate,
        props.startTime,
        props.endDate,
        props.endTime
      )}
    </P>
  </>
)

EventDate.propTypes = {
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
}

export default EventDate
