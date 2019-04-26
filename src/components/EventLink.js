import React from 'react'
import PropTypes from 'prop-types'
import { P, A } from 'styled-system-html'

const EventLink = props => (
  <P fontSize={0} mb={2} fontWeight="bold">
    Go to event:{' '}
    <A fontWeight="bold" ml={1} href={props.eventUrl}>
      {props.eventUrl
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/$/, '')}
    </A>
  </P>
)

EventLink.propTypes = {
  cost: PropTypes.string,
}

export default EventLink
