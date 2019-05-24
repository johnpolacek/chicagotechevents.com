import React from 'react'
import PropTypes from 'prop-types'
import EventHeader from './EventHeader'
import EventDate from './EventDate'
import EventDescription from './EventDescription'
import EventAddress from './EventAddress'
import EventCost from './EventCost'
import EventLink from './EventLink'
import { Div } from 'styled-system-html'

const Event = props => (
  <Div
    key={props.url}
    pb={4}
    mb={4}
    borderBottom={props.isLast ? 'none' : 'solid 1px'}
    borderColor="gray2"
  >
    <EventHeader {...props} />
    <EventDate {...props} />
    <EventDescription {...props} />
    <EventAddress {...props} />
    <EventCost {...props} />
    <EventLink {...props} />
  </Div>
)

Event.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  locationName: PropTypes.string.isRequired,
  locationStreet: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
}

export default Event
