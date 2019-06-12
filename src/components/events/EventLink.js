import React from 'react'
import PropTypes from 'prop-types'
import { P, A } from 'styled-system-html'

const EventLink = props => { 
    let eventUrl = props.eventUrl
    if (eventUrl.includes('eventbrite.com') && !eventUrl.includes('?')) {
      eventUrl += '?aff=ebdiacchicagotechevents'
    }
    return (
      <P fontSize={0} mb={2} fontWeight="bold">
        Go to event:{' '}
        <A fontWeight="bold" ml={1} href={eventUrl}>
          {props.eventUrl
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace(/\/$/, '')}
        </A>
      </P>
    )
  }

EventLink.propTypes = {
  cost: PropTypes.string,
}

export default EventLink
