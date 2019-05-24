import React from 'react'
import PropTypes from 'prop-types'
import { P } from 'styled-system-html'
import { getEventDateString } from '../util'

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
